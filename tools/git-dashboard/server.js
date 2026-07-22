#!/usr/bin/env node
// Local-only git dashboard server. No dependencies beyond Node core.
// Binds to 127.0.0.1 so it is never reachable off this machine.

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const PORT = process.env.GIT_DASHBOARD_PORT || 5175;

function git(args) {
  const result = spawnSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8' });
  return {
    ok: result.status === 0,
    stdout: (result.stdout || '').trim(),
    stderr: (result.stderr || '').trim(),
  };
}

function parseStatus() {
  const branchRes = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  const branch = branchRes.stdout || '(unknown)';

  let ahead = 0, behind = 0, hasUpstream = false;
  const upstreamRes = git(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
  if (upstreamRes.ok) {
    hasUpstream = true;
    const counts = git(['rev-list', '--left-right', '--count', 'HEAD...@{u}']);
    if (counts.ok) {
      const [a, b] = counts.stdout.split(/\s+/).map(Number);
      ahead = a || 0;
      behind = b || 0;
    }
  }

  const statusRes = git(['status', '--porcelain=v1']);
  const files = statusRes.stdout
    ? statusRes.stdout.split('\n').filter(Boolean).map((line) => {
        const statusCode = line.slice(0, 2);
        let file = line.slice(3);
        if (file.includes(' -> ')) file = file.split(' -> ')[1];
        return { status: statusCode.trim() || '??', path: file };
      })
    : [];

  return { branch, hasUpstream, ahead, behind, files };
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' };

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (req.method === 'GET' && url.pathname === '/') {
      const file = fs.readFileSync(path.join(__dirname, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(file);
    }

    if (req.method === 'GET' && url.pathname === '/api/status') {
      return sendJson(res, 200, parseStatus());
    }

    if (req.method === 'GET' && url.pathname === '/api/diff') {
      const file = url.searchParams.get('file');
      if (!file) return sendJson(res, 400, { error: 'file is required' });
      const tracked = git(['diff', '--', file]);
      const diff = tracked.stdout || git(['diff', '--no-index', '--', '/dev/null', file]).stdout;
      return sendJson(res, 200, { diff });
    }

    if (req.method === 'GET' && url.pathname === '/api/branches') {
      const local = git(['branch', '--format=%(refname:short)']);
      const remote = git(['branch', '-r', '--format=%(refname:short)']);
      return sendJson(res, 200, {
        local: local.stdout ? local.stdout.split('\n') : [],
        remote: remote.stdout ? remote.stdout.split('\n') : [],
      });
    }

    if (req.method === 'POST' && url.pathname === '/api/commit') {
      const { files, message, push } = await readBody(req);
      if (!message || !message.trim()) return sendJson(res, 400, { error: 'Commit message is required' });
      if (!Array.isArray(files) || files.length === 0) return sendJson(res, 400, { error: 'No files selected' });

      const add = git(['add', '--', ...files]);
      if (!add.ok) return sendJson(res, 500, { error: add.stderr || 'git add failed' });

      const commit = git(['commit', '-m', message]);
      if (!commit.ok) return sendJson(res, 500, { error: commit.stderr || commit.stdout || 'git commit failed' });

      let pushResult = null;
      if (push) {
        pushResult = git(['push']);
        if (!pushResult.ok) {
          return sendJson(res, 500, { error: pushResult.stderr || 'git push failed', commitOutput: commit.stdout });
        }
      }

      return sendJson(res, 200, { commitOutput: commit.stdout, pushOutput: pushResult ? pushResult.stdout : null });
    }

    if (req.method === 'POST' && url.pathname === '/api/push') {
      const result = git(['push']);
      if (!result.ok) return sendJson(res, 500, { error: result.stderr || 'git push failed' });
      return sendJson(res, 200, { output: result.stdout });
    }

    if (req.method === 'POST' && url.pathname === '/api/pull') {
      const result = git(['pull']);
      if (!result.ok) return sendJson(res, 500, { error: result.stderr || 'git pull failed' });
      return sendJson(res, 200, { output: result.stdout });
    }

    if (req.method === 'POST' && url.pathname === '/api/merge') {
      const { branch } = await readBody(req);
      if (!branch || !branch.trim()) return sendJson(res, 400, { error: 'branch is required' });
      const result = git(['merge', branch]);
      if (!result.ok) return sendJson(res, 500, { error: result.stderr || result.stdout || 'git merge failed' });
      return sendJson(res, 200, { output: result.stdout });
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  } catch (err) {
    sendJson(res, 500, { error: err.message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Git dashboard running at http://127.0.0.1:${PORT}`);
  console.log(`Repo: ${REPO_ROOT}`);
});
