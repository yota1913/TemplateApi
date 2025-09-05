module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false,field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, allowNull: false,field: 'updated_at' },
    },
    {
      timestamps: true,
      tableName: 'users',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );
  
    return Users;
  };
  