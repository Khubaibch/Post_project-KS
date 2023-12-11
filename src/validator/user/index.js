import Joi from "joi";

const userValidator = {
  createUser: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp(`^(?=.*\\d)(?=.*\\d)[\\s\\S]{5,}$`))
          .required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({
          message: "Invalid data",
          error,
        });
      }
      next();
    } catch (err) {
      return res.status(500).json({
        message: "Invalid data",
        err,
      });
    }
  },
};

export default userValidator;
