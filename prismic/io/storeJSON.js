#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");

async function storeJSON(fetchObject, outputDir) {
  if (!fetchObject) throw "Missing 'fetchObject' parameter.";
  if (!outputDir) throw "Missing 'outputDir' parameter.";

  console.log(`Removing existing directory: '${outputDir}' ...`);
  await fs.remove(outputDir);

  console.log(`Creating new directory: '${outputDir}' ...`);
  await fs.ensureDir(outputDir);

  for (key of Object.keys(fetchObject))
    await (async function(key) {
      const fetch = fetchObject[key];

      console.log(`Fetching data from the network ...`);
      const data = await fetch();

      const fileName = `${key}.json`;
      console.log(`Writing @${key} into: '${outputDir}/${fileName}' ...`);
      await fs.writeJson(path.join(outputDir, fileName), data);
      
      console.log(`Done!`);
    })(key);
}

module.exports = storeJSON;
