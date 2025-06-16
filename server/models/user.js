'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helper/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.LabResult, { foreignKey: 'userId' });

    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : "Username already exists"
      },
      validate : {
        notNull : {
          msg : "Username is required"
        },
        notEmpty : {
          msg : "Username is required"
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : "Email already exists"
      },
      validate : {
        notNull : {
          msg : "Email is required"
        },
        notEmpty : {
            msg : "Email is required"
        },
        isEmail : {
            msg : "Incorrect e-mail format"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password is required"
        },
        notEmpty : {
          msg : "Password is required"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = hash(user.password)
  })
  
  return User;
};