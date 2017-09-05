'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    description: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Item.accociate = function(models) {
  Item.hasMany(models.Purchase, {
    as: 'Purchases', foreignKey: 'itemId'
  })
}
  return Item;
};
