
module.exports =
  {
    images: {
      domains: ['https://artist-portal-backend-phase4.square63.net', 'https://manage.audiosocket.com'],
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