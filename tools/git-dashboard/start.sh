#!/usr/bin/env bash
# Launches the local git dashboard and opens it in the browser.
set -euo pipefail
cd "$(dirname "$0")"
PORT="${GIT_DASHBOARD_PORT:-5175}"
( sleep 1 && open "http://127.0.0.1:${PORT}" ) &
node server.js
