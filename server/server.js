const express = require('express');
const app = express();
let PORT = process.env.PORT || 5005;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  res.send(calculations)
})
function calculateResult(firstNumber, secondNumber, operation) {
  switch (operation) {
    case "+":
      return Number(firstNumber) + Number(secondNumber)
    case "-":
      return Number(firstNumber) - Number(secondNumber)
    case "*":
      return Number(firstNumber) * Number(secondNumber)
    case "/":
      return Number(firstNumber) / Number(secondNumber)


  }
}
// POST /calculations
app.post('/calculations', function (req, res) {
  console.log(req.body);
  let newCalculation = req.body;
  const result = calculateResult(newCalculation.numOne, newCalculation.numTwo, newCalculation.operator)
  calculations.push({ ...newCalculation, result: result })


  res.send(201);
})

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
