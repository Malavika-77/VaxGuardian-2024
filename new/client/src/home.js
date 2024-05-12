import { useNavigate } from 'react-router-dom';
import './style.css'; 

function Home() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
    
   event.preventDefault();
   navigate("/login");


    };
 const handlepage=(event)=>{

    navigate("/checksche");

  };

  return (

    <div className='background'>
    <h1 className='headingcenter'>A vaccinated baby is a baby surrounded by a community of immunity @ save</h1>
    <p className='para'>Vaccination is crucial for babies for several reasons. Firstly, it protects them from serious and potentially life-threatening diseases such as measles, polio, diphtheria, whooping cough, and hepatitis B. These diseases can have severe complications in babies, including pneumonia, brain damage, paralysis, and even death. Vaccinating babies also contributes to herd immunity, 
        making it harder for diseases to spread within communities and protecting those who cannot be vaccinated.</p><br></br>

     <p className='para2'>Vaccines are safe and undergo rigorous testing before approval. They are highly effective at preventing diseases when administered according to the recommended schedule.
         Vaccinating babies is not only important for their health but also for public health efforts to control and eliminate diseases.</p><br></br>
     
     <p className='para3'>Furthermore, vaccinations are cost-effective compared to the expenses associated with treating diseases and their complications. By vaccinating your baby, you not only protect their health but also contribute to the overall well-being of the community. 
        It provides peace of mind knowing that you are taking proactive steps to ensure your baby's health and safety.</p>
     
     
      <div className='seconddiv'>
       
        <div className='thirddiv'>
        <form  onSubmit={handleSubmit}>
           <button type='submit' id='btn1' className='btn'>LOGIN</button><br></br><br></br>
          <button onClick={handlepage} id='btn2' className='btn'>CHECK SCHEDULES</button>
    

        </form></div>
      </div>
    </div>
  );
}

export default Home;
