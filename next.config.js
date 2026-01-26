const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Prevent Next/Turbopack from picking `/home/justice` as the root due to another lockfile.
    root: __dirname
  }
};

module.exports = withNextIntl(nextConfig);

