const _ = require("lodash");
const types = require("./types");

fold = (inputObject, keyName) => {
  if (!types.obj.isValid(inputObject))
    throw `Parameter 'inputObject' must be an object.`;

  if (!types.str.isValid(keyName))
    throw `Parameter 'keyName' must be a string.`;

  return _.reduce(
    inputObject,
    (resultArray, valueObject, headKey) => {
      //console.debug(resultArray, valueObject, headKey);

      if (!types.obj.isValid(valueObject))
        throw `Iterated value 'valueObject' = ${valueObject}, must be an object.`;

      resultArray.push({ ...valueObject, [keyName]: headKey });
      return resultArray;
    },
    []
  );
};
exports.fold = fold;

//local test
const obj = {
  obj: {},
  obj1: {
    id: "Aj",
    name: "joan"
  },
  obj2: {
    id: "As",
    name: "sergio"
  },
  obj3: {
    id: "Dt",
    name: "tino"
  }
};

//console.debug(fold(obj, "id"));
