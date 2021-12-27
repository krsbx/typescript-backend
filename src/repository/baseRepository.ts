import _ from 'lodash';
import { Op, Sequelize } from 'sequelize';
import moment from 'moment';

export const findAll =
  (model: any) =>
  (conditions: any, filterQueryParams: any = {}, options: any = {}) => {
    const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
    const offset =
      options.page && options.page > 0 ? limit * (options.page - 1) : 0;
    const otherOptions = _.omit(options, ['limit', 'offset']);

    // translate filterQueryParams to sequelize conditions
    // only works for AND condition for now
    const rules: any[] = [];
    _.forEach(filterQueryParams.rules, ({ field, operator, value }: any) => {
      let sequelizeOp = null;
      let sequelizeValue = value;
      switch (operator) {
        case '=':
          sequelizeOp = Op.eq;
          break;
        case '>':
          sequelizeOp = Op.gt;
          break;
        case '<':
          sequelizeOp = Op.lt;
          break;
        case '>=':
          sequelizeOp = Op.gte;
          break;
        case '<=':
          sequelizeOp = Op.lte;
          break;
        case 'CONTAINS':
          sequelizeOp = Op.like;
          sequelizeValue = `%${value}%`;
          break;
        case 'IN':
          sequelizeOp = Op.in;
          break;
        default:
          sequelizeOp = operator;
      }

      // Need to wrap the value with DATE() function if want to compare date using YYYY-MM-DD format
      if (moment(sequelizeValue, 'YYYY-MM-DD', true).isValid()) {
        rules.push(
          Sequelize.where(
            Sequelize.fn('Date', Sequelize.col(field)),
            sequelizeOp,
            sequelizeValue
          )
        );
      } else {
        rules.push({
          [field]: { [sequelizeOp]: sequelizeValue },
        });
      }
    });

    const where = { ...conditions };
    if (where[Op.and]) {
      where[Op.and] = [...where[Op.and], ...rules];
    } else {
      where[Op.and] = rules;
    }

    return model.findAll({
      where,
      ...(limit === 0 ? {} : { limit }),
      offset,
      ...otherOptions,
    });
  };

export const createRow = (model: any) => (data: any) => model.create(data);

export const updateRow =
  (model: any) => (conditions: object | string, data: any) => {
    const dbCond = _.isObject(conditions) ? conditions : { id: conditions };

    return model.update(data, { where: dbCond });
  };

export const deleteRow = (model: any) => (conditions: object | string) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: conditions };

  return model.destroy({ where: dbCond });
};

export const findOne = (model: any) => (conditions: object | string) => {
  const dbCond = _.isObject(conditions) ? conditions : { id: conditions };

  return model.findOne({ where: dbCond });
};

export const modelToResource = async (model: any) => model;

export const resourceToModel = async (resource: any) => resource;

export const factory = (model: any) => ({
  findAll: findAll(model),
  findOne: findOne(model),
  create: createRow(model),
  update: updateRow(model),
  delete: deleteRow(model),
  modelToResource: modelToResource,
  resourceToModel: resourceToModel,
});
