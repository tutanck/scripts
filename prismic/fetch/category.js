#!/usr/bin/env node

const util = require("util");

const u = require("../../util/unfold");

const inspectConfig = { showHidden: false, depth: 10, colors: true };

const { getApi, Predicates } = require("prismic-javascript");

const apiURL = "https://stupid.prismic.io/api/v2";

const itemMapper = (raw, index) => {
  const { item } = raw;
  return {
    id: item.uid,
    title: item.data.title[0].text,
    description: item.data.description[0].text,
    price: item.data.price,
    image: item.data.image
  };
};

const categoryMapper = (raw, index) => ({
  id: raw.uid,
  items: raw.data.items.map(itemMapper)
});

async function fetchCategories() {
  const api = await getApi(apiURL);
  const response = await api.query(Predicates.at("document.type", "category"), {
    fetchLinks: ["item.title", "item.description", "item.price", "item.image"],
    pageSize: 100
  });

  //console.debug("response:", util.inspect(response, inspectConfig), "\n\n");
  const mappedArray = response.results.map((raw, index) =>
    categoryMapper(raw, index)
  );
  //console.debug("mappedArr:", util.inspect(mappedArray, inspectConfig), "\n\n");
  return u.unfold(mappedArray, "id");
}
module.exports = fetchCategories;
