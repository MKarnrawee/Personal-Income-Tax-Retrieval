var express = require("express");
var app = express();
const { validateInput } = require("./validator");

app.use(express.json()); //Used to parse JSON bodies

var server = app.listen(8000, function () {
  //   var host = server.address().address;
  var port = server.address().port;
  console.log("Application Run At http://%s", port);
});

app.get("/getpit", function (req, res) {
  const validateResult = validateInput(req);
  
  if (!validateResult.data.isMatch) {
    res.status(validateResult.http);
    return res.send({
      description: validateResult.data.message,
    });
  }

  try {
    let netIncome = req.body.netIncome;
    let pit;
    let inRange;

    if (netIncome <= 150000) {
      pit = 0;
    } else if (netIncome > 150000 && netIncome <= 300000) {
      //max 7500
      inRange = netIncome - 150000;
      pit = 0.05 * inRange;
    } else if (netIncome > 300000 && netIncome <= 500000) {
      //max 20000
      inRange = netIncome - 300000;
      pit = 0.1 * inRange + 7500;
    } else if (netIncome > 500000 && netIncome <= 750000) {
      //max 37500
      inRange = netIncome - 500000;
      pit = 0.15 * inRange + 27500;
    } else if (netIncome > 750000 && netIncome <= 1000000) {
      //max 50000
      inRange = netIncome - 750000;
      pit = 0.2 * inRange + 65000;
    } else if (netIncome > 1000000 && netIncome <= 2000000) {
      //max 250000
      inRange = netIncome - 1000000;
      pit = 0.25 * inRange + 115000;
    } else if (netIncome > 2000000 && netIncome <= 5000000) {
      //max 900000
      inRange = netIncome - 2000000;
      pit = 0.3 * inRange + 365000;
    } else if (netIncome > 5000000) {
      inRange = netIncome - 5000000;
      pit = 0.35 * inRange + 1265000;
    }

    res.status(200);
    return res.send({
      personalIncomeTax: pit,
    });
  } catch (error) {
    console.log("GET PERSONAL INCOME TAX ERROR: ", error);
    res.status(error.http || 500);
    return res.send({
      description: error.message || "generic_server_error",
    });
  }
});
