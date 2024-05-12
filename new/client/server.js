//server.js
const express=require('express');
const app= express();
const bodyParser=require("body-parser");
const port=3000;
const mongoose=require('mongoose');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,  'build')));


mongoose.connect("mongodb://localhost:27017/vaccine")
.then(()=>{
    console.log("site connection established");
})
.catch((error)=>{
    console.log("site connection not established");
   
});
////////////////////////////////////////////////////////////
//database logins
const userschema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
   
});
console.log("userschema is generated");
////////////////////////////////////////////////////////////
const login=mongoose.model('login',userschema);
console.log("model is created");
///////////////////////////////////////////
//database updateschedule schema
const userschema2=new mongoose.Schema({
    selectedValue:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true},
    date:{

     type:String,
        required:true
    },
    vaccine:{
        type:String,
        required:true
    }
});
console.log("userschema2 is generated");
/////////////////////////////////////////////////

const updateschedule=mongoose.model('updateschedule',userschema2);
console.log("model2 is created");



/////////////////////////////////////////////////

app.get("/",async(req,res)=>{

    res.sendFile(path.join(__dirname, 'build','index.html'));

});
//////////////////////////////////////////////////
//login
 app.post("/login",async(req,res)=>{

    const { username, password } = req.body;


    if(!username||!password){
   
        console.log("please fill the fields");
        return res.status(400).send("Please fill both username and password fields");

      }
     

    try{
        const logging= await login.findOne({username,password});
        if(logging){
            return res.send("ok");
        }
        else{
            console.log("logging error");
        }

    }
    catch(error){
        console.error("Error in logging:", error.message);
        return res.status(500).send("Error in logging: " + error.message);
    }

 });
///////////////////////////////////////////////////////////////////////////////

app.post("/updateschedule", async(req,res)=>{

const {selectedValue,time,date,vaccine}=req.body;
if(!selectedValue||!time||!date||!vaccine){
    console.log("please fill every fields");
}
try{
const update= await updateschedule.findOne({selectedValue:selectedValue,time:time,date:date,vaccine:vaccine});

if(update){
    console.log("details exists");
    return res.send("details exists");

}
else{
    
        const savedetails=new updateschedule({
                               selectedValue:selectedValue,
                               time:time,
                               date:date,
                               vaccine:vaccine
                });

                await savedetails.save();
                console.log("saved sucessfully");
}}
catch(error){
    console.error("Error in saving:", error.message);
    return res.status(500).send("Error in saving: " + error.message);
}

});



app.get("/getSavedDetails", async (req, res) => {
    try {
      const savedDetails = await updateschedule.find();
      res.json(savedDetails);
    } catch (error) {
      console.error("Error fetching saved details:", error);
      res.status(500).send("Error fetching saved details");
    }
  });
  //////////////////////////////////////////////////////////////
  app.get("/check", async (req, res) => {
    const selectedValue = req.query.selectedValue;
    if (!selectedValue) {
      console.log("No value is selected");
      res.status(400).send("No value is selected");
      return;
    }
  
    try {
      // Find all documents that match the selected value
      const details = await updateschedule.find({ selectedValue: selectedValue });
      if (details.length > 0) {
        res.json(details);
      } else {
        res.json([]);
        console.log("No details found for the selected value");
        res.status(404).send("No details found for the selected value");
      }
    } catch (error) {
      console.error("Error checking details:", error);
      res.status(500).send("Error checking saved details");
    }
});
//////////////////////////////////////
app.post("/change", async (req, res) => {
    const username = req.body.username;
    var password = req.body.password;

    // Check if username and password are provided
    if (!username || !password) {
        console.log("Please fill in both username and password.");
        return res.status(400).send("Please fill in both username and password.");
    }

    try {
        // Check if the user with the provided username exists
        const user = await login.findOne({ username: username });
        if (!user) {
            console.log("User not found.");
            return res.status(404).send("User not found.");
        }

        // Update the password for the user
        user.password = password; // Assign the new password

        // Save the updated user object
        await user.save();

        // Respond with success message
        console.log("Password changed successfully.");
        return res.status(200).send("Password changed successfully.");
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).send("Error changing password: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});