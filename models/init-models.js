var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _tag = require("./tag");
var _user = require("./user");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    article,
    tag,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
