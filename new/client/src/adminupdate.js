import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Adminupdate(){
const [selectedValue,setSelectedValue]=useState('');
const [time,setTime]=useState('');
const [date,setDate]=useState('');
const [vaccine,setVaccine]=useState('');
const [savedDetails, setSavedDetails] = useState([]);

const navigate=useNavigate();



const handleSubmit=async (event)=>{

    event.preventDefault();
if(!selectedValue||!time||!date){

alert("fill every fields");
}
try{
    const response= await fetch("/updateschedule",{
        method:"POST",
        headers: {"Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedValue, time,date,vaccine }),
});

if (response.ok) {
    // Redirect to admin update page upon successful login
   // Update saved details state after successfully saving a new item
   const newDetail = { selectedValue, time, date, vaccine };
   setSavedDetails([...savedDetails, newDetail]);
   
   // Clear input fields
   setSelectedValue('');
   setTime('');
   setDate('');
   setVaccine('');

   // Redirect to admin update page upon successful submission
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
const handleChange=(event)=>{

setSelectedValue(event.target.value);
};
const handleTime=(event)=>{

    setTime(event.target.value);
    };
    const handleDate=(event)=>{

        setDate(event.target.value);
        };
        
        useEffect(() => {
            // Fetch saved details from the backend API
            const fetchSavedDetails = async () => {
              try {
                const response = await fetch("/getSavedDetails");
                if (response.ok) {
                  const data = await response.json();
                  setSavedDetails(data);
                } else {
                  console.error("Failed to fetch saved details");
                }
              } catch (error) {
                console.error("Error fetching saved details:", error);
              }
            };
            fetchSavedDetails();
          }, []);
        
          const handleVaccine=(event)=>{

            setVaccine(event.target.value);
            };

            


    return(
<div className="background">
                 
<div className="seconddiv">
<h1 className="head2">UPDATE SCHEDULES</h1>
<form onSubmit={handleSubmit} action="/updateschedule" method="post">
<div className="element3">
       <label>Choose your baby's year or month </label>
       
       <select value={selectedValue} onChange={handleChange} name="selectedValue" >
                        <option value="">Select an option</option>
                        <option value="At Birth">At Birth (0 to 1 month)</option>
                        <option value="At 2 months">At 2 months</option>
                        <option value="At 4 months">At 4 months</option>
                        <option value="At 6 months">At 6 months</option>
                        <option value="At 12 to 15 months">At 12 to 15 months</option>
                        <option value="At 18 months">At 18 months</option>
                        <option value="At 4 to 6 years">At 4 to 6 years</option>
                    </select><br></br><br></br>
                    <label>Time</label>
                    <input type="text" name="time" value={time} onChange={handleTime}></input>
                    <label>Date</label>
                    <input type="text" name="date" value={date} onChange={handleDate}></input><br></br><br></br>
                    <label>Vaccine Avaliable</label>
                    <input type="text" name="vaccine" value={vaccine} onChange={handleVaccine}></input>
</div>
        <button type="submit" className="btn1">SUBMIT</button><br></br><br></br>
       



</form>



</div>
<div className="display">
<h2>Saved Details</h2>
<ul>
  {savedDetails.map((detail, index) => (
    <li key={index}>
      <strong>Baby's age:</strong> {detail.selectedValue},{" "}
      <strong>Time:</strong> {detail.time}, <strong>Date:</strong> {detail.date},
      <strong>Vaccine Available:</strong> {detail.vaccine}
    </li>
  ))}
</ul>

   
</div>
</div>



    );
}
export default Adminupdate;
