const fs = require("fs");
let data = "This is my starting journey to learn node";

fs.writeFile("./message.txt", data, (err) => {
    if (err) throw err;
    console.log("The file has been saved");
});