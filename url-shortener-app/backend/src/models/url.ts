import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

interface UrlAttributes {
  originalUrl: string;
  shortCode: string;
}

class Url extends Model<UrlAttributes> {
  public originalUrl!: string;
  public shortCode!: string;
}

Url.init({
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Url',
});

export default Url;
