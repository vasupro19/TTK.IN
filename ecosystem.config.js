/**
 * PM2 process definition for the VPS.
 *
 *   pm2 start ecosystem.config.js
 *
 * Runs Next's binary directly rather than going through `npm start`. Passing
 * `-p`/`-H` through npm needs a nested `--`, which PM2 does not reliably
 * forward — the app then falls back to port 3000 and Nginx proxies to nothing.
 *
 * `-H 127.0.0.1` is deliberate: Nginx is the only thing that should reach this
 * process. Setting HOSTNAME as an environment variable does *not* do the same
 * job — Next still binds every interface — so the flag is the one that matters.
 */
module.exports = {
  apps: [
    {
      name: "thetravelkart",
      script: "node_modules/next/dist/bin/next",
      args: `start -p ${process.env.PORT || 3001} -H 127.0.0.1`,
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      // Next reads .env.local itself; NODE_ENV is all PM2 needs to set.
      env: { NODE_ENV: "production" },
      // Restart if the process balloons — a runaway is better replaced than left.
      max_memory_restart: "800M",
      time: true,
    },
  ],
};
