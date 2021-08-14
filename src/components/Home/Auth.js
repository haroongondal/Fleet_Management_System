import React from 'react';

class LoginPage extends React.Component{
   constructor(){
      super();
   }
    render(){
      return(

         <div class="text-bg ">
                     <h1>User Access Not Granted</h1>
                     <a class="btn btn-custom-dark" href="#openModal-login">Login</a>
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
      )
    }   

}

export default LoginPage;
