const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})



app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/3a3fe17c31"

  const options = {
    method: "POST",
    auth: "kushank:1ae145bc47f19447f19784fdf24f735c-us"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
})


app.post("/failure", function(req,res) {
  res.redirect("/")
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
})


// API key
// 1ae145bc47f19447f19784fdf24f735c-us10

// list ID
// 3a3fe17c31
