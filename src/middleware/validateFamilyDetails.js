const Joi = require('joi');

const familySchema = Joi.object({
  members: Joi.array()
    .items(
      Joi.object({
        relation: Joi.string().required(),
        dob: Joi.date().required(),
        gender: Joi.string().valid('Male', 'Female').required(),
      })
    )
    .required(),
  personalDetails: Joi.object({
    mobile: Joi.string().length(10).required(),
    pincode: Joi.string().length(6).required(),
  }).required(),
});

const validateFamilyDetails = (req, res, next) => {
  const { error } = familySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = validateFamilyDetails;
