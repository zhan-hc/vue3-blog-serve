const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "标题"
    },
    tagId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "标签id"
    },
    categoryId: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "分类id"
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "描述"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "内容"
    },
    pageImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "封面图片"
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    star: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "点赞数"
    },
    reading: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: true,
      defaultValue: 0000000001,
      comment: "阅读量"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "上下线"
    }
  }, {
    sequelize,
    tableName: 'article',
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
      {
        name: "tag_id",
        using: "BTREE",
        fields: [
          { name: "tagId" },
        ]
      },
    ]
  });
};
