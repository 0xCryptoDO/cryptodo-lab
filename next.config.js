const nextTranslate = require('next-translate');

const nextConfig = nextTranslate({
  reactStrictMode: true,

  // Include ONLY for local testing (do not commit to production and staging). This option enable sourcemaps for debug
  // productionBrowserSourceMaps: true,
});

module.exports = nextConfig;
