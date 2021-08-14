import React, {Component} from "react"; 
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLoginPage, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";

import { withRouter } from 'react-router'


class SignOutNavBar extends Component{
    constructor(props) {
        super(props);

this.signOut = this.signOut.bind(this);
    }

    async signOut(){


        this.props.history.push("/signout",
            {username: "admin",
                adminid: localStorage.getItem("adminid"),
                adminusername: localStorage.getItem("adminusername")}
        )



    }

    render() {
        return(

            localStorage.getItem("adminid") ?

            <div>
                  <div class="containerAdmin">
                    <ul>
                        <li>
                               
                            <FontAwesomeIcon
                                icon={faUser}
                                inverse
                                size="2x"
                                style={{marginRight:'10px'}}
                            />
                            {/*<br/>*/}
                            <span style={{fontSize:'20px',color:'white'}}>{localStorage.getItem("adminusername")}</span>
                            <span className="tooltiptext" style={{marginLeft:'20px'}}>

                                                <button class="logbtn"  href ="/signout" onClick={this.signOut} style={{marginLeft:'10px'}}>
                                                {/*    <button onClick={<SignOut adimusername={this.props.user}/>}>*/}
                                                    <FontAwesomeIcon
                                                        icon={faSignOutAlt}
                                                        inverse
                                                        size="2x"
                                                        
                                                    />
                                                    {/*</button>*/}
                                                </button>
                                                <span style={{fontSize:'20px',color:'white'}}>Logout</span>  </span>
                        </li>

                    </ul>

                 </div>
         </div> :
                <div></div>
        )
    }


}

export default withRouter(SignOutNavBar);