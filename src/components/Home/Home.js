import React from 'react';

class LoginPage extends React.Component{
   constructor(){
      super();
   }
    render(){
      return(
         <div class="banner_main" >
         <div class="row">
         <div class="column left">
         <div class="text-bg ">
                     <h1>Fleet Management</h1> <h1 >And Tracking</h1>
                     <span >Under Your Own Board</span>
                     <p >Probably the smart Software to capture, track and control your fleet's maintenance and airworthiness in real time. </p>
                     <a class="btn btn-custom third" href="#openModal-login">Login</a>
                     <a class="btn btn-custom-dark third"  href="register">Register</a>
                     <div id="openModal-login" class="modalDialog">
      <div>
         <a href="#close" title="Close" class="close">X</a>
         <h2 class="text-bg ">Login As</h2>
         <a class="btn btn-custom" href="/dashboard">Admin</a>
         <a class="btn btn-custom-dark"  href="/driverdashboard">Driver</a>
         <a class="btn btn-custom"  href="/addbooking">Customer</a>
         
       </div>
   </div>
         </div>
         </div>
         <div class="column right">
         <div class="text-img">
                     <figure><img src="./images/img.png" /></figure>
                  </div>
         </div>
</div> 
      </div>
      )
    }   

}

export default LoginPage;
