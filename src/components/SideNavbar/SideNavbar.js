import React, {Component} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
// import PropTypes from 'prop-types';
// import styled from "styled-components"

// import {faLoginPage} from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare,faUser,faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'  

// import { fad } from '@fortawesome/pro-duotone-svg-icons'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import SignOut from "../SignOut/SignOut";
// import {Redirect} from "react-router-dom";

library.add(
    fab,
    faCoffee,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare
)

const MenuSpan = styled.span`
  font-size:30px;
  cursor:pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  //js:openNav();
`;

const MenuHeader = styled.span`
  font-size:20px;
  cursor:pointer;
  //color: whitesmoke;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

export default class SideNavbar extends Component{

    constructor(props) {
        super(props);
        this.state ={
            dropdownOpen: true,
        }
        this.toggle = this.toggle.bind(this)
    }

    toggle(){
        this.setState({dropdownOpen: !this.state.dropdownOpen})
    }

    render() {
        // if(localStorage.getItem("adminid")){
        //     <Navbar/>
        // }

        return (
            localStorage.getItem("adminid") ?
                <div>

                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle>
                        <MenuSpan> &#9776; Open</MenuSpan>
                    </DropdownToggle>

                    <DropdownMenu className="dropdown-content">


                        <DropdownItem text><MenuHeader> Vehicle Management</MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem addvehicle href="/addvehicle" ><MenuHeader>  Add Vehicle </MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem vehiclereservationstatus href="/addvehiclereservation" > <MenuHeader> Add Vehicle Reservation Status</MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem getallvehicle href="/getallvehicle" > <MenuHeader> Get All Vehicle </MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem vehiclefueling href="/vehiclefueling" ><MenuHeader> Vehicle Fueling </MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem vehiclemaintenance href="/vehiclemaintenance" ><MenuHeader> Vehicle Maintenance </MenuHeader></DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem text> <MenuHeader> Vendor Management</MenuHeader> </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem addvendor href="/addvendor" ><MenuHeader> Add Vendor </MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem getallvendors href="/getallvendors" ><MenuHeader> Get All Vendors </MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem vendorpartpurchasing href="/partspurchase" ><MenuHeader> Parts Purchasing </MenuHeader></DropdownItem>
                        <DropdownItem divider />


                        <DropdownItem text><MenuHeader> Customer Management </MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem addcustomer href="/register" ><MenuHeader> Add Customer</MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem editcustomer href="/editcustomer" ><MenuHeader> Edit Customer</MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem getallcustomer href="/getallcustomers" ><MenuHeader> Get All Users </MenuHeader></DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem text> <MenuHeader> Driver Management </MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        {/*<DropdownItem adddriver href="/adddriver" ><MenuHeader> Add Driver</MenuHeader></DropdownItem>*/}
                        {/*<DropdownItem divider />*/}

                        <DropdownItem editdriver href="/editdriver" ><MenuHeader> Edit Driver</MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem getalldriver href="/getalldriver" ><MenuHeader> Get All Driver</MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem assigndriver href="/assigndriver" ><MenuHeader> Assign Driver </MenuHeader></DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem drivercheckin href="/checkin" ><MenuHeader> Check In History </MenuHeader></DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem drivercheckout href="/checkout" ><MenuHeader> Check Out History </MenuHeader></DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem text><MenuHeader> Booking Management</MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        {/*<DropdownItem addbooking href="/addbooking" ><MenuHeader> Add Booking</MenuHeader></DropdownItem>*/}
                        {/*<DropdownItem divider />*/}
                        <DropdownItem getallbooking href="/viewbooking" ><MenuHeader> Get All Booking</MenuHeader></DropdownItem>
                        <DropdownItem divider />




                        <DropdownItem text><MenuHeader> Dashboard Analytics </MenuHeader> </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem dashboardanalytics href="/dashboardanalytics" ><MenuHeader> Analytics</MenuHeader> </DropdownItem>
                        <DropdownItem divider />

                        <DropdownItem text><MenuHeader> Fuel Budget Management </MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem fuelbudget href="/addfuelbudget" ><MenuHeader> Fuel Budget</MenuHeader></DropdownItem>
                        <DropdownItem divider />
                        
                        <DropdownItem adminmap href="/showmap" ><MenuHeader> Map</MenuHeader></DropdownItem>
                        <DropdownItem divider />





                        {/*<DropdownItem>Some Action</DropdownItem>*/}
                        {/*<DropdownItem text>Dropdown Item Text</DropdownItem>*/}
                        {/*<DropdownItem disabled>Action (disabled)</DropdownItem>*/}
                        {/*<DropdownItem divider />*/}
                        {/*<DropdownItem>Foo Action</DropdownItem>*/}
                        {/*<DropdownItem>Bar Action</DropdownItem>*/}
                        {/*<DropdownItem>Quo Action</DropdownItem>*/}
                    </DropdownMenu>

                </Dropdown>


            </div>
            :
                <div></div>
        )


    }


}