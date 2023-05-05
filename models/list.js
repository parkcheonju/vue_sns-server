/* DB모델링 : MAKE A TABLE sequelize : 테이블과 칼럼생성*/

module.exports = (sequelize, DataTypes) => {
  const list = sequelize.define("List", {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    userImage: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    postImage: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER(300),
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    liked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    content: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    filter: {
      type: DataTypes.INTEGER(300),
      allowNull: false,
    },
  });
  return list;
};
