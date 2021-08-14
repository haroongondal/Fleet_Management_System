import React from 'react';
import emailjs from 'emailjs-com';
import AppBarCustomer from './AppBarCustomer'
// var Rating = require('react-rating');
// import './ContactUs.css';
import Rating from 'react-rating'
export default function ContactUs(props) {
  const[name,setName]=React.useState();
  const[email,setEmail]=React.useState();
  const[message,setMessage]=React.useState();
  async function sendEmail(e) {
    e.preventDefault()
        e.target.reset();
    let did =props.match.params.driverID;
    let dr =props.match.params.driverRating;
    let dc =props.match.params.count;
    let templateParams={
      'did':did,
      'rating':driverRating,
      'from_name':name,
      'f_email':email,
      'message':message

    }
    emailjs.send('service_nnv0vba', 'template_jmipfba',templateParams, 'user_6h09PaRoMyb4E3EhGz2ky')
      .then((result) => {
          console.log('email running'+result.text);
          
          alert('Feedback sent Successfully')
      }, (error) => {
          console.log('email error running'+error.text);
         

      });
      e.target.reset();
      const token= await saveRating({driverRating,dr,dc})
  }
  async function saveRating(driverRat) {
    let did =props.match.params.driverID;

    return fetch('https://fmts.herokuapp.com/api/updateRating?did='+did, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(driverRat)
  })
        .then(data => {data.json();console.log('driver id feedback: '+did)
        ;console.log('driver feedback running: '+driverRating)}
        , (error) => {
          console.log('driver id feedback error running: '+driverRating+'  '+error.text)
      });
}
  const[driverRating,setRating]=React.useState(0);

  return (
      <>
    <AppBarCustomer />
    <form id="myFrom" className="contact-form" onSubmit={sendEmail} style={{marginTop:'50px'}}>
      <label>Name</label>
      <input type="text" class="text_input" name="from_name" onChange={e => setName(e.target.value)} /><br></br>
      <label>Email</label><br></br>
      <input type="email" class="text_input" name="f_email" onChange={e => setEmail(e.target.value)}/>
      <label>Driver Rating</label><br></br>
      <Rating onClick={value => setRating(value) }/><br></br>
      <label>Message</label><br></br>
      <textarea name="message" cols="40" rows="5" onChange={e => setMessage(e.target.value)}/>
      <input type="submit" value="Send" />
      
    </form>
    
    </>
  );
}