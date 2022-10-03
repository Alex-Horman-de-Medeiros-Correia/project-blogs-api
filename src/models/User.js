const User = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'users'
    })
  
    User.associate = (models) => {
      User.hasMany(models.BlogPost, {
        as: 'blog_posts,',
        foreignKey: 'userId',
      });
    }
  
    return User;
  };
  
  module.exports = User;
  