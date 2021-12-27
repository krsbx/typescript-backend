import _ from 'lodash';
import { factory } from './baseRepository';
import models from '../models';
import { encrypt } from '../utils/encryption';
import { IUser } from '../utils/modelInterfaces';

const { User } = models;

const userRepository = factory(User);

userRepository.resourceToModel = async (resource: IUser) => {
  // hash password/passcode if available
  const model = _.pick(resource, ['email', 'firstName', 'lastName', 'avatar']);
  if (resource.password) {
    model.password = await encrypt(resource.password);
  }

  return model;
};

userRepository.modelToResource = async (model) => {
  const resource = model.toJSON();

  return _.omit(resource, ['password', 'createdAt', 'updatedAt']);
};

export default userRepository;
