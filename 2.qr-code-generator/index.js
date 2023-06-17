// use the inquirer npm package to get the user input 
import inquirer from 'inquirer'
import qr from 'qr-image'
import fs from 'fs'

inquirer
    .prompt([
        { name: "url", message: "Enter url you want to convert into qr code" }
    ])
    .then((answer) => {
        // console.log(answer);
        const url = answer.url;
        var qr_png = qr.image(url, { type: 'png' });
        qr_png.pipe(fs.createWriteStream('./images/qr_image.png'));

        fs.writeFile('./qr-text/urls', url, (err) => {
            if (err) throw err;
            console.log("saved successfully");
        })
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("Prompt couldn't be rendered in the current environment");
        } else {
            console.log("Something else went wrong");
        }
    })