/*
Enums of available supported types for the requests parameters
Each type has its optional version.
*/

//ex : {}
exports.obj = {
  isValid: arg => arg != null && typeof arg === "object" && !Array.isArray(arg),
  toString: "object"
};

//ex : {} or null
exports.optobj = {
  isValid: arg =>
    arg == null || (typeof arg === "object" && !Array.isArray(arg)),
  toString: "object?"
};

//ex : toString()
exports.fun = {
  isValid: arg => arg != null && typeof arg === "function",
  toString: "function"
};

//ex : toString() or null
exports.optfun = {
  isValid: arg => arg == null || typeof arg === "function",
  toString: "function?"
};

//ex : []
exports.arr = {
  isValid: arg => arg != null && Array.isArray(arg),
  toString: "array"
};

//ex : [] or null
exports.optarr = {
  isValid: arg => arg == null || Array.isArray(arg),
  toString: "array?"
};

//ex : 'Regina'
exports.str = {
  isValid: arg => arg != null && typeof arg === "string",
  toString: "string"
};

//ex : 'Regina' or null
exports.optstr = {
  isValid: arg => arg == null || typeof arg === "string",
  toString: "string?"
};
