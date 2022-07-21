
module.exports =
  {
    images: {
      domains: ['artist-portal-backend-phase4.square63.net', 'manage.audiosocket.com'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
        },
      });
      return config;
    },
  }