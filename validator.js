module.exports = {
  validateInput: (req) => {
    if (!req.body.netIncome) {
      return {
        http: 400,
        data: {
          isMatch: false,
          message: "netIncome field is required",
        },
      };
    }
    if (typeof req.body.netIncome != "number") {
      return {
        http: 400,
        data: {
          isMatch: false,
          message: "Invalid type of netIncome",
        },
      };
    }
    return {
      http: 200,
      data: {
        isMatch: true,
        message: "Success access",
      },
    };
  },
};
