const express = require("express");
const app = express();
const port = 3000;

// we use body parser with express and below is the format to use this

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/", (req, res) => {
    // console.log(req.body);
    var num1 = req.body.num1;
    var num2 = req.body.num2;

    var result = parseInt(num1) + parseInt(num2);

    res.send(`The calculation result is ${result}`);
});

app.get("/bmicalculator", (req, res) => {
    res.sendFile(__dirname + '/bmi_calculator.html');
})

app.post("/bmicalculator", (req, res) => {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var bmi = weight / (height * height);

    res.send(`Your Bmi is ${bmi}`);
})
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});

//using body-parser npm package to process form data
// nodemon to auto reload
//express 