const Category = (Sequelize, DataTypes) => {
    const Category = Sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    }, {
      timestamps: false,
      tableName: 'categories'
    })
  
    return Category;
  };
  
  module.exports = Category;
  