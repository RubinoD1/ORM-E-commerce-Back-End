const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
     // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
     // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
     // make it so our model name stays lowercase in the database
    modelName: 'category',
  }
);

//export the created model so it can be used in other parts of the app
module.exports = Category;
