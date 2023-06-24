const express = require('express');
const client = require("@mailchimp/mailchimp_marketing");
const app = express();

const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;

    // console.log(fname + " " + lname + " " + email);
    const listId = "317214e782";

    client.setConfig({
        apiKey: "dd11d3cfd85531fd1538be447c04e695-us17",
        server: "us17",
    });

    const subscribingUser = {
        firstName: fname,
        lastName: lname,
        email: email
    };

    async function run() {
        const response = await client.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });

        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id
            }.`
        );
    }

    run().then(() => {
        res.sendFile(__dirname + "/success.html");
    }).catch((Error) => {
        res.sendFile(__dirname + "/failure.html");
    })
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

//list id => 317214e782

// api key => dd11d3cfd85531fd1538be447c04e695-us17

app.listen(port, () => {
    console.log("server up and running on port " + port);
});