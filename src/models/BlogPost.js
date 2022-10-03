const BlogPost = (Sequelize, DataTypes) => {
    const BlogPost = Sequelize.define('BlogPost', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      published: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'blog_posts'
    });
  
    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
    }
  
    return BlogPost;
  };
  
  module.exports = BlogPost;
  