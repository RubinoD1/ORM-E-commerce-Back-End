const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
      // define an id column
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      // define product_id column
      product_id: {
          type: DataTypes.INTEGER,
          references: {
            //this is reference to the product model 
              model: "product",
              //this is the column name of the referenced model 
              key: "id"
          }
      },
      // define tag_id column
      tag_id: {
          type: DataTypes.INTEGER,
          references: {
            //this is reference to the tag model 
              model: "tag",
              //this is the column name of the referenced model
              key: "id"
          }
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
