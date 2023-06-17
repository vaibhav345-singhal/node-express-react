const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello welcome to my server<h1>");
});

app.get("/contact", function (req, res) {
    res.send("contact me at vaibhav@gmail.com");
})

app.get("/about",(req,res)=>{
    res.send("Hello my name is Vaibhav and i am learning