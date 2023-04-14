const express = require("express");
const app = express();
const port = 3000;

// functions to performm calculator operations

const add = (n1, n2) => {
  return n1 + n2;
};

const subtract = (n1, n2) => {
  return n1 - n2;
};

const multiply = (n1, n2) => {
  return n1 * n2;
};

const divide = (n1, n2) => {

    // Check if division by zero and throw error message

  if (n2 === 0) {
    throw new Error("Cannot divide by zero");
  }
  return n1 / n2;
};

// Set up a route to handle requests to the calculator endpoint

app.get("/calculate", (req, res) => {
    try {
      const n1 = parseFloat(req.query.n1);
      const n2 = parseFloat(req.query.n2);
      const operation = req.query.operation;
      if (isNaN(n1)) {
        throw new Error("Invalid value for n1");
      }
      if (isNaN(n2)) {
        throw new Error("Invalid value for n2");
      }
      let result;
      switch (operation) {
        case "add":
          result = add(n1, n2);
          break;
        case "subtract":
          result = subtract(n1, n2);
          break;
        case "multiply":
          result = multiply(n1, n2);
          break;
        case "divide":
          result = divide(n1, n2);
          break;
        default:
          throw new Error("Invalid operation");
      }
      res.status(200).json({ Status: "Success", Statuscode: 200, Answer: result });
    } catch (error) {
      console.error(error);
      res.status(400).json({ Status: "Error", Statuscode: 400, Msg: error.message });
    }
  });

  app.get("/health", (req, res) => {
    // Return a 200 OK response to indicate that the app is healthy
    res.status(200).send("OK");
  });

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
