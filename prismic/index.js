#!/usr/bin/env node

const path = require("path");
const loadJS = require("./io/loadJS");
const storeJSON = require("./io/storeJSON");

async function run() {
  console.log(`
  --------------------------
  prismic script started.
  --------------------------
  `);

  const inputPath = path.resolve(__dirname, "./fetch/");
  console.log("inputPath: ", inputPath);

  const outputDir = path.resolve(__dirname, "../../src/content");
  console.log("outputDir: ", outputDir);

  const fetchObject = await loadJS(inputPath);
  console.log("fetchObject:", fetchObject);

  await storeJSON(fetchObject, outputDir);

  console.log(`
  --------------------------
  prismic script finished.
  --------------------------
  `);
}

run();
