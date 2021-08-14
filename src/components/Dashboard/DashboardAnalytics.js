import React, {Component} from "react";
 
import LoginPage from "../Login/LoginPage";
import 'react-toastify/dist/ReactToastify.css';

import ReactNotifications from 'react-browser-notifications';
import SnackbarF from "../Snackbar/FuelSB.js"
import SnackbarW from "../Snackbar/WarrantySB.js"
import SnackbarS from "../Snackbar/ServicesSB.js"
import Analytics from './Analytics'



class DashboardAnalytics extends Component {

    constructor(props) {
        super(props);
        this.showNotifications = this.showNotifications.bind(this);
        this.handleClick = this.handleClick.bind(this);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            date: date,
            count: true,
            totalfuelcost: [],
            tempdata: {series:[]},
            Bartempdata: [],
            totalfuelcostforallvehicles: 0,
            vehiclecount: 0,
            class: "wcontainer",
            partwarrantydetails: [],
            fuelbudgetdetails: [],
            totalfuelbudget: 0,
            chartData:{labels: [],
              series: []
            },
            BarchartData:{labels: [],
                series: []
              }
              
        }
        const fuelCrossed=false;
        let warrantyDate = false;
        let warrantyCount=0;
        this.timeout = null
        localStorage.setItem('warrantyCount',0);
        this.getTotalFuelCost = this.getTotalFuelCost.bind(this);
        this.AddTotalFuelCost = this.AddTotalFuelCost.bind(this);
    }

     showNotifications =() => {
        if(this.n.supported()) this.n.show();
      }
    
        handleClick =(event) => {
        this.n.close(event.target.tag);
      }
    onshow = () => {

        if (this.timeout) {
            clearTimeout();
            this.setState({class: "wcontainer"}, () => {
                this.timeout = setTimeout(() => {
                    this.showNotification();
                }, 500);
            });
        } else {
            this.showNotification();
        }

    }

    showNotification = () => {

        this.setState({
            class: "wcontainershow",
        }, () => {
            setTimeout(() => {
                this.setState({
                    class: "wcontainer"
                });

            }, 5000);
        });
    }

    AddTotalFuelCost(fuelcost) {
        alert(fuelcost)
        this.state.totalfuelcost = this.state.totalfuelcost + fuelcost
        alert(this.state.totalfuelcost)

        // this.setState({totalfuelcost})

    }

    async getTotalFuelCost() {
        const totalfuelcostresponse = await fetch("https://fmts.herokuapp.com/api/gettotalfuelcost?chart=yes", {method: 'GET'});
        const totalfuelcostdetails = await totalfuelcostresponse.json();
        let totalfuelcost = 0;
        let totalvehiclecount = 0;
        totalfuelcostdetails.map(
            
            element =>{
                this.state.totalfuelcost.push(element['totalFuelCost']['$numberDecimal'])
                    this.state.tempdata.series.push(element['totalFuelCost']['$numberDecimal'])
                    this.state.chartData.labels.push((element['_id']['month']+'-'+element['_id']['day']))
                    
                
            }       
       )
                    console.log(' ');
                    this.state.chartData.series.push(this.state.tempdata.series);
                                

        for (let i = 0; i < this.state.totalfuelcost.length; i++) {
            totalfuelcost = parseFloat(totalfuelcost) + parseFloat(this.state.totalfuelcost[i])
            totalvehiclecount = parseInt(totalvehiclecount) + 1

        }
        this.setState({totalvehiclecount: totalvehiclecount})
        this.setState({totalfuelcostforallvehicles: totalfuelcost})
    }
    async getPartsCost() {
        const totalfuelcostresponse = await fetch("https://fmts.herokuapp.com/api/getallparts?partcost=yes", {method: 'GET'});
        const totalfuelcostdetails = await totalfuelcostresponse.json();

        totalfuelcostdetails.map(
            
            element =>{
                    this.state.Bartempdata.push(element['totalCost'])
                    this.state.BarchartData.labels.push(element['_id'])
                    
            }       
       )
                    this.state.BarchartData.series.push(this.state.Bartempdata);
                    this.setState({count:false})
    }

    async getPartsWarranty() {

        const partswarrantyresponse = await fetch("https://fmts.herokuapp.com/api/getpartswarranty", {method: 'GET'});
        const partswarrantydetails = await partswarrantyresponse.json();
        this.setState({partwarrantydetails: partswarrantydetails})

    }

    async getTotalFuelBudget() {
        const fuelbudgetresponse = await fetch("https://fmts.herokuapp.com/api/getfuelbudget", {method: 'GET'});
        const fuelbudgetdetails = await fuelbudgetresponse.json();
        this.setState({fuelbudgetdetails: fuelbudgetdetails})

    }

    componentDidMount() {
        this.getPartsWarranty();
        this.getTotalFuelBudget();
        if(this.state.count ==true){
            this.getTotalFuelCost();
            this.getPartsCost();
            console.log('component mount check running')
        }
        
        console.log('component mount running')
    }

    render() {
        if (!localStorage.getItem("adminid")) {
            return <LoginPage/>
        }

        return (
            localStorage.getItem("adminid") ?
                <div>
                    <Analytics data={this.state.chartData} bar={this.state.BarchartData} fuelCrossed={this.fuelCrossed} warrantyDate={this.warrantyDate} />
                    {/* <Drawer /> */}
                    {/*   */}
                    <div>
                        {/* Alert when Fuel budget crossed or equal to fuel budget */}
                        {this.state.fuelbudgetdetails.map((value) => {
                           let percent=(value['totalfuelbudget']*80)/100;
                            if (this.state.totalfuelcostforallvehicles >= value['totalfuelbudget'] ) {
                                        localStorage.setItem('fuelCrossed',true);
                                        this.fuelCrossed=true;
                                        
                                return (

                                        <SnackbarF messaage={'Fuel Budget Crossed'}/>
                                    )
                            }
                            else if(this.state.totalfuelcostforallvehicles == percent){
return (

                                        <SnackbarF messaage={'Fuel Budget Reached 80%'}/>
                                    
                                    )
                            }
                        })
                        }


                                { this.state.partwarrantydetails.map((value) => {
                            if (this.state.date >= value['warrantyenddate']) {
                                
                                localStorage.setItem('warrantyDate',false);
                                let warranty =this.state.partwarrantydetails.length;
                                localStorage.setItem('warrantyCount',warranty);
                                this.warrantyDate=true;

                                return (
                                    <>
                                    <p style={{color: "red"}}>Part Warranty about to expire!!!
                                    <table>
                                        <th>Part ID</th>
                                        <th> Warrant End Date</th>
                                    {this.showNotifications()}
                                    <SnackbarW />
                                    <SnackbarS />

                                                <tr>
                                                    <td> {value['partID']}
                                                        </td>
                                                    <td> {value['warrantyenddate']} </td>
                                                </tr>
                                                </table>
                                </p>
                            </> 
                                )
      
                            }
                        })
                        }
                       

                    </div>
                    <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title="Admin" // Required
          body="You have reminders to check kindly visit dahboard"
          icon="icon.png"
          tag="abcdeg"
          timeout="6000"
          onClick={event => this.handleClick(event)}
        />


                    <button onClick={this.onshow}>Show Warranty & Fuel Budget</button>
                    <React.Fragment>
                        

                         <div class={this.state.class}>

                            <p style={{color: "red"}}> Parts Warranty
                            <table>
                                <th>Part ID</th>
                                <th>Warranty End Date</th>
                                {this.state.partwarrantydetails.map((value) => <tr>
                                    <td> {value['partID']} </td>
                                    <td> {value['warrantyenddate']}</td>
                                </tr>)}
                                
                            </table>
                            </p>
                            <p style={{color: "red"}}> Fuel budget
                            <table>
                                <th>Total Fuel Budget</th>
                                <th>Total Fuel Cost</th>
                                {this.state.fuelbudgetdetails.map((value) => <tr>
                                    <td> {value['totalfuelbudget']} </td>
                                    <td> {this.state.totalfuelcostforallvehicles}</td>
                                </tr>)}

                            </table>
                            </p>
                         </div>
                    </React.Fragment>
                

                </div> :
                <div></div>
        )
    }
}


export default DashboardAnalytics;