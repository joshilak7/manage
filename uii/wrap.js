let s = (nn) => {
  return function (req, res, next) {
    nn(req, res, next).catch(next);
  };
};

module.exports = s;
