import Joi from '@hapi/joi';

class Validator {
  validRegister(data) {
    const schema = Joi.object({
      email: Joi
        .string()
        .required()
        .email()
        .messages({
          'string.empty': 'Required',
          'string.email': 'Invalid email address'
        }),
      firstName: Joi
        .string()
        .required()
        .messages({'string.empty': 'Required'}),
      surname: Joi
        .string()
        .required()
        .messages({'string.empty': 'Required'}),
      password: Joi
        .string()
        .required()
        .pattern(/^(?=.*[a-z])(?=.*\d).{6,}$/)
        .messages({
          'string.empty': 'Required',
          'string.pattern.base': 'Password must contain letters and numbers'
        })
    })
  
    return schema.validate(data);
  }

  validLogin(data) {
    const schema = Joi.object({
      email: Joi
        .string()
        .required()
        .email()
        .messages({
          'string.empty': 'Required',
          'string.email': 'Invalid email address'
        }),
      password: Joi
        .string()
        .required()
        .messages({'string.empty': 'Required'})
    });
  
    return schema.validate(data);
  }
}


export {
  Validator
};