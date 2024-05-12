import { useState } from "react";
import { useEffect } from "react";


function Checksche(){

const [selectedValue,setSelectedValue]= useState('');
const [savedDetails, setSavedDetails] = useState([]);
const handleChange= (event)=>{
    setSelectedValue(event.target.value);

};

const handleSubmit=(event)=>{
    event.preventDefault();


};


useEffect(() => {
    const fetchSavedDetails = async () => {
      try {
        const response = await fetch(`/check?selectedValue=${selectedValue}`);
        if (response.ok) {
          const data = await response.json();
          setSavedDetails(data);
        } else {
            setSavedDetails('');
          console.error("Failed to fetch saved details");
        }
      } catch (error) {
        console.error("Error fetching saved details:", error);
      }
    };

    if (selectedValue) {
      fetchSavedDetails();
    }
  }, [selectedValue]);

return(
<div className="background">
<h1 >See vaccination schedules here........</h1>
<div className="element4">
<form onSubmit={handleSubmit}action="/check" method="get">
       <label>Choose your baby's year or month </label>
       <select value={selectedValue} onChange={handleChange} name="selectedValue">
                        <option value="">Select an option</option>
                        <option value="At Birth">At Birth (0 to 1 month)</option>
                        <option value="At 2 months">At 2 months</option>
                        <option value="At 4 months">At 4 months</option>
                        <option value="At 6 months">At 6 months</option>
                        <option value="At 12 to 15 months">At 12 to 15 months</option>
                        <option value="At 18 months">At 18 months</option>
                        <option value="At 4 to 6 years">At 4 to 6 years</option>
                    </select>

        



</form></div>
<div>
<p className="para4">Age plays a significant role in determining the vaccination schedule for children.
     Vaccines are administered at specific ages to provide optimal protection against vaccine-preventable diseases and to ensure that children develop immunity at the right time.</p>
</div>
<p className="para5">Here's how age correlates with vaccination:</p>

<p className="para6">Birth to 2 Months: During this period, infants receive vaccines to protect against diseases such as hepatitis B, diphtheria, tetanus, pertussis (whooping cough), Haemophilus influenzae type b (Hib), polio, and pneumococcal disease. These vaccines are typically administered at birth, 2 months, and 4 months of age.

<br></br>4 to 6 Months: Infants continue to receive doses of vaccines initiated in the first two months. Additionally, some vaccines, such as rotavirus vaccine, may be administered during this period.

<br></br>6 to 12 Months: At around 6 months of age, infants may receive additional doses of vaccines they received earlier in the first few months of life. They may also receive vaccines for diseases such as influenza (flu) and measles, mumps, rubella (MMR) around 6 to 12 months.

<br></br>12 to 18 Months: At this stage, children may receive booster doses of vaccines to ensure long-term immunity. This includes vaccines such as hepatitis A, varicella (chickenpox), and MMR.

<br></br>18 Months to 6 Years: Children continue to receive additional doses of certain vaccines to complete the recommended series and maintain immunity. This includes vaccines such as DTaP, polio, MMR, varicella, and influenza.

<br></br>School Age and Adolescence: As children grow older, they may require additional vaccines, such as vaccines against human papillomavirus (HPV), meningococcal disease, and tetanus, diphtheria, and pertussis (Tdap), to protect against diseases and ensure ongoing immunity.</p>
<p className="para7">It's important for parents and caregivers to follow the recommended vaccination schedule provided by healthcare professionals. Vaccinating children according to the recommended schedule helps protect them from serious diseases and contributes to overall public health by preventing outbreaks of vaccine-preventable diseases.
 If there are any questions or concerns about vaccination, parents should consult with their child's healthcare provider for guidance.</p>



 <div className="display2">
<h2>Vaccine Available.................</h2>
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
export default Checksche;