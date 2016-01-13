"use strict";

var loaderUtils = require("loader-utils");
var glob = require("glob");
var path = require("path");

module.exports = function (content, sourceMap) {
  this.cacheable();

  var resourceDir = path.dirname(this.resourcePath);
  var files = glob.sync(content.trim(), {
    cwd: resourceDir
  });

  return "module.exports = {\n" + files.map(function (file) {
    var name = path.basename(file, path.extname(file));
    this.addDependency(file);

    return "  '" + name + "': require(" + JSON.stringify(file) + ")"
  }, this).join(",\n") + "\n};";
};
