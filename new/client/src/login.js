//login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate= useNavigate();

 const handlelogin =async (event)=>{
    event.preventDefault();

    if (!username || !password) {
      alert("Please fill in both username and password fields.");
      return;
  }

  try {
      const response = await fetch("/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
          // Redirect to admin update page upon successful login
          navigate("/adminupdate");
      } else {
          // Handle login failure (e.g., display error message)
          const errorMessage = await response.text();
          alert(errorMessage);
      }
  } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in.");
  }
};

 const handleusername=(event)=>{
    setUsername(event.target.value);
    
 };
 const handlepassword=(event)=>{
    setPassword(event.target.value);
    
    
 };


return(
<div className="background">
    

                    <div className="seconddiv">
                    <h1 className="head" >ADMIN LOGIN</h1>
                        <div className="thirddiv2">
                            <form onSubmit={handlelogin} action="/login"method="post">
                               <div className="element">
                                <label>ADMIN NAME</label><br></br>
                                <input type="text" name="username" id="username" value ={username}  onChange={handleusername}></input><br></br><br></br>
                                <label>PASSWORD</label><br></br>
                                <input type="password" name="password" id="password"  value ={password} onChange={handlepassword}></input></div><br></br><br></br><br></br><br></br><br></br><br></br>
                               
                                <button type="submit" className="btn">LOGIN</button><br></br>

                               <h6> <NavLink to ="/changepass">FORGOT PASSWORD?</NavLink></h6>
                            </form></div>

                    </div>
</div>





);}
export default Login;