const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "登录的用户名"
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    blogname: {
      type: DataTypes.STRING(30),
      allowNull: true,
      defaultValue: "",
      comment: "博客用户名"
    },
    motto: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
      comment: "个性签名"
    },
    github: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "头像图片链接"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
