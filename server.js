const express = require("express");
const app = express();
let fs = require('fs');
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.render("login")
})

const userValidation = "admin";
const passValidation = "123456"

app.post("/login-validation", (req, res)=> {
    const user = req.body.user
    const pass = req.body.pass


    if (user === userValidation && pass === passValidation){
        res.render("registration")
    } else {
        res.render("login",  {error: "PLEASE TRY AGAIN"})
    }
});


app.post("/registration",  (req, res) => {
    let fsn = req.body.firstname
    let lsn = req.body.lastname  
    let age = req.body.age
    let email = req.body.email

    res.render("Successfull_form")
    fs.writeFile('data/' + "dataOfUser.txt" , "FirstName:"+fsn+","+"LastName:"+lsn+","+"Age:"+age+","+"Email:"+email ,function (err) {
        if (err) throw err;
        res.end();
        });
})

app.get("/downloadData", (req, res) => {
    res.download("data/dataOfUser.txt")
})


app.listen(3000)