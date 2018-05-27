const _ = require("lodash");
const types = require("./types");

unfold = (inputArray, commonKey) => {
  if (!types.arr.isValid(inputArray))
    throw `Parameter 'inputArray' = ${inputArray}, must be an array.`;

  if (!types.str.isValid(commonKey))
    throw `Parameter 'commonKey' = ${commonKey}, must be a string.`;

  return _.reduce(
    inputArray,
    (resultObject, valueObject) => {
      //console.debug(resultObject, valueObject, commonKey);

      if (!types.obj.isValid(valueObject))
        throw `Iterated value 'valueObject' = ${valueObject}, must be an object.`;

      const resultKey = valueObject[commonKey];

      if (!types.str.isValid(resultKey))
        throw `Resulting key 'resultKey' = ${resultKey}, must be a string.`;

      const resultValue = { ...valueObject };
      delete resultValue[commonKey];
      resultObject[resultKey] = resultValue;
      return resultObject;
    },
    {}
  );
};
exports.unfold = unfold;

//local test
const tab = [
  {
    id: "Aj",
    name: "joan"
  },
  {
    id: "As",
    name: "sergio"
  },
  {
    id: "Dt",
    name: "tino"
  }
];

//console.debug(unfold(tab, "id"));
