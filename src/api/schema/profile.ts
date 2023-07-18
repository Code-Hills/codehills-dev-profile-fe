import joi from 'joi';

const requiredErrorMessage = '{#label} is required';
const personal = joi
  .object({
    firstName: joi.string().required().label('first name'),
    lastName: joi.string().required().label('Last name'),
    displayName: joi.string().required().label('Display name'),
    gender: joi.string().valid('male', 'female').required(),
  })
  .messages({
    'string.empty': requiredErrorMessage,
  })
  .options({ allowUnknown: true });

const bank = joi
  .object({
    BankName: joi.string().required().label('Bank Name'),
    // accountNumber: joi.string().required().label('Account Number'),
    accountName: joi.string().required().label('Account Name'),
    Currency: joi.string().required(),
    SwiftCode: joi.string().required().label('Swift Code'),
    // balance: joi.string().required(),
  })
  .messages({
    'string.empty': requiredErrorMessage,
  })
  .options({ allowUnknown: true });

const address = joi
  .object({
    country: joi.string().required(),
    city: joi.string().required(),
    street: joi.string().required(),
  })
  .messages({
    'string.empty': requiredErrorMessage,
  })
  .options({ allowUnknown: true });

const profileSchema = {
  personal,
  bank,
  address,
};

export default profileSchema;
