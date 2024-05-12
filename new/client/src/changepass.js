import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Changepass(){

 const[username,setUsername]=useState('');
 const[password,setPassword]=useState('');
 const navigate=useNavigate();

 const handleSubmit = async (event) => {
   event.preventDefault();

   if (!password || !username) {
       alert("Please fill in every field."); // This is where the error message is shown
       return;
   }

   try {
       const response = await fetch("/change", {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({ username, password }), // Make sure username and password are correctly passed here
       });
      
      if (response.ok) {
         
         navigate("/login");
        
      } else {
          // Handle login failure (e.g., display error message)
          const errorMessage = await response.text();
          alert(errorMessage);
      }
      } catch (error) {
      console.error("Error changing in:", error);
      alert("An error occurred while changingin.");
      }
      };



const handleUsername=(event)=>{
setUsername(event.target.value);
};
 const handlePassword=(event)=>{
    setPassword(event.target.value);
 };


    return(

          <div className="background">
                   <div className="seconddiv">
                    <h1 className="head2" >CHANGE PASSWORD</h1>
                        <div className="thirddiv2">
                   <form onSubmit={handleSubmit} action="/change" method="post">
                    <div className="element2">
                    <lable>ADMIN NAME</lable><br></br><br></br>
                    <input type="text" name="username" id="username" value={username} onChange={handleUsername}></input><br></br><br></br>
                    <label>PASSWORD</label><br></br><br></br>
                    <input type="password"name="password" id ="password" value={password} onChange={handlePassword}></input>
                    </div><br></br><br></br><br></br>
                    <button type="submit" className="btn">CHANGE PASSWORD</button>
                   </form>
                   </div>
          </div></div>




    );
}

export default Changepass;