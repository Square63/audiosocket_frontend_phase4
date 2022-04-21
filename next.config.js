
module.exports =
  {
    images: {
      domains: ['artist-portal-backend-phase4.square63.net'],
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