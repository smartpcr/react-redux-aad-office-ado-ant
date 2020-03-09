const fs = require("fs");
const path = require("path");
const Promise = require("bluebird");
const HtmlWebpackPlugin = require("html-webpack-plugin");
Promise.promisifyAll(fs);


/**
 * Writes all assets paths (.js, .css) which WebPack generates to a JSON file
 */
class AssetsPlugin {
  /**
   *
   * @param {Object} options options.outputFile specifies path to JSON file to save the assets
   */
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("AssetsPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync("AssetsPlugin", (data, cb) => {
        const folder = path.dirname(this.options.outputFile);
        if (!fs.existsSync(folder))
          fs.mkdirSync(folder);

        fs.writeFileAsync(this.options.outputFile, JSON.stringify({ bodyTags: data.bodyTags, headTags: data.headTags }))
          .then(() => {
            cb(null, data);
          });
      });
    })
  }
}

module.exports = AssetsPlugin;
