#!/usr/bin/env bash
#
# Redeploy TheTravelKart on the VPS.
#
#   cd /var/www/thetravelkart && ./deploy.sh
#
# Builds before reloading, and stops on the first failure, so a broken build
# never replaces a working one — the old process keeps serving.

set -euo pipefail

APP_NAME="${APP_NAME:-thetravelkart}"
BRANCH="${BRANCH:-main}"

cd "$(dirname "$0")"

echo "==> Fetching $BRANCH"
git fetch --quiet origin "$BRANCH"

before="$(git rev-parse --short HEAD)"
git checkout --quiet "$BRANCH"
git pull --quiet --ff-only origin "$BRANCH"
after="$(git rev-parse --short HEAD)"

if [ "$before" = "$after" ]; then
  echo "    Already at $after — nothing new to deploy."
else
  echo "    $before -> $after"
  git --no-pager log --oneline "$before..$after" | sed 's/^/      /'
fi

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building"
# If this is killed, the box is out of RAM — add swap (see DEPLOY-VPS.md §4).
npm run build

echo "==> Reloading $APP_NAME"
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  pm2 reload "$APP_NAME" --update-env
else
  echo "    '$APP_NAME' is not running under pm2 — start it first:"
  echo "    pm2 start ecosystem.config.js && pm2 save"
  exit 1
fi

echo "==> Waiting for it to answer"
port="${PORT:-3001}"
for i in $(seq 1 30); do
  if curl -fsS -o /dev/null "http://127.0.0.1:${port}/"; then
    echo "    OK on 127.0.0.1:${port}"
    echo "==> Deployed $after"
    exit 0
  fi
  sleep 2
done

echo "    !! No response on 127.0.0.1:${port} after 60s"
echo "    Check: pm2 logs $APP_NAME --lines 50"
exit 1
