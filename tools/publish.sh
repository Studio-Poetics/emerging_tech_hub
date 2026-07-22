#!/usr/bin/env bash
# Quick one-shot publish: stage everything, commit, push.
# Usage: tools/publish.sh "commit message"
set -euo pipefail
cd "$(dirname "$0")/.."

MESSAGE="${1:-Update site content}"

if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to commit — working tree is clean."
  exit 0
fi

git add -A
git status --short
git commit -m "$MESSAGE"
git push
