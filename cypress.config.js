const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const webpack = require('@cypress/webpack-preprocessor');

module.exports = defineConfig({
  e2e: {
     e2e: {
    baseUrl: 'http://www.automationpractice.pl/index.php?',
    },
    videosFolder: 'cypress/videos',
    video: true,
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.js']
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
            ]
          }
        },
      };

      on('file:preprocessor', webpack(options));
      allureWriter(on, config);
      return config;
    },
  },
});
