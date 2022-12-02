const express = require("express");
const https = require("node:https")
const bodyParser = require("body-parser");
const request = require("request");
//const { stringify } = require("node:querystring");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.post("/",function(req,res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    
    const data = {
        members: [
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME: lastName
                }

            }

        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/fda203a3c4"

    const options ={
        method : "POST",
        auth: "roshay1:d49dd83c111621e6d95e92bde318fe71-us18"
    }

    const request = https.request(url,options, function(response){
        if (response.statusCode===200){
            res.send("Sign Up Successful");
        }
        else{
            res.send("Sign Up Failed. Something went wrong");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();
})

app.get("/", function(request,response){
    response.sendFile(__dirname + "/signup.html");
   
})


app.listen(3000, function(){
    console.log("Server is running at port 3000");
})


// API key
// d49dd83c111621e6d95e92bde318fe71-us18