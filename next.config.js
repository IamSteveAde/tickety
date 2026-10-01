/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => ({
  // Keep production builds from overwriting a running dev server's chunks.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  reactStrictMode: true,
});
