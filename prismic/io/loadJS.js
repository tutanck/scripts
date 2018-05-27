const fs = require("fs-extra");
const path_module = require("path");

/**
 *
 * @param {*} path
 * /!\
 * This simple loading tool is not intended for multi-depth paths.
 * If a path contains files with the same name in a different depth,
 * the resulting files may override each other in unpredictable ways.
 */
async function loadJS(path, depth = 1) {
  const stat = await fs.lstat(path);
  const isDir = stat.isDirectory();

  console.log("path: ", path, "... is a", isDir ? "directory" : "file");

  if (isDir && depth > 0) {
    const files = fs.readdirSync(path);
    console.log("content: ", files);

    const result = {};
    for (let file of files) {
      const partial = await loadJS(
        path_module.join(path, file),
        0 /*Do not recusre on inner directories*/
      );
      Object.assign(result, partial);
    }

    console.log("directory result:", result);
    return result;
  } else {
    if (path_module.extname(path) === ".js") {
      const result = {
        [path_module.basename(path, ".js")]: require(path)
      };

      console.log("file result:", result);
      return result;
    }
  }
}

module.exports = loadJS;
