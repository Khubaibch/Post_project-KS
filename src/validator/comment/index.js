import Joi from "joi";
const commentValidator = {
  createComment: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        comment: Joi.string().min(3).max(50).required(),
        UserId: Joi.required(),
        PostId: Joi.required(),
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
      res.status(500).json({
        err,
        message: "Something bad happend",
      });
    }
  },
};
export default commentValidator;
