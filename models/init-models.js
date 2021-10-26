var DataTypes = require("sequelize").DataTypes;
var _tag = require("./tag");
var _user = require("./user");

function initModels(sequelize) {
  var tag = _tag(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    tag,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
