const asyncWrapper = (fxn) => {
  return async (req, res, next) => {
    try {
      await fxn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
