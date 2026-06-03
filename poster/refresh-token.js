#!/usr/bin/env node
// Refreshes the long-lived Instagram access token before its 60-day TTL.
//
// On success: writes the new token + new expiry into the GitHub Actions
// step summary so a workflow step can update the repo secret via gh CLI.
// (See .github/workflows/refresh-token.yml.)

const { refreshLongLivedToken } = require("./lib/graph");
const fs = require("fs");

(async () => {
  try {
    const body = await refreshLongLivedToken();
    const newToken  = body.access_token;
    const expiresIn = body.expires_in; // seconds
    const days = Math.round(expiresIn / 86400);
    console.log(`Token refreshed. New TTL: ${days} days (${expiresIn}s).`);

    // Surface the new token to subsequent steps via GITHUB_OUTPUT only
    // (NEVER print it to logs).
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `new_token=${newToken}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `expires_in=${expiresIn}\n`);
    }
    // Mask it in logs just in case.
    console.log(`::add-mask::${newToken}`);
  } catch (e) {
    console.error("Token refresh FAILED:", e.message);
    process.exit(1);
  }
})();
