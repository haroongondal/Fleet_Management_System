import React, {Component} from "react";
import Auth from '../Home/Auth';
import Drawer from "../Drawer/Drawer";
 
import Button from '@material-ui/core/Button';

export default class AddFuelBudget extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fuelbudgetdetails:[],
            fuelbudgetid: '',
            totalfuelbudget: '',
            budgetsetdate: '',
            budgetsetby:'',
            formFlag:false,
            min:1,
            max: 70000

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveFuelBudget = this.saveFuelBudget.bind(this);


    }
    async getTotalFuelBudget() {
        const fuelbudgetresponse = await fetch("https://fmts.herokuapp.com/api/getfuelbudget", {method: 'GET'});
        const fuelbudgetdetails = await fuelbudgetresponse.json();  
        this.setState({fuelbudgetdetails: fuelbudgetdetails})

    }
    async saveFuelBudget(fuelbudgetdetails){

        return fetch("https://fmts.herokuapp.com/api/addfuelbudget",
            {method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(fuelbudgetdetails)

            })
            .then(data => data.json())


    }

    async handleSubmit(e){
        e.preventDefault()
        e.target.reset()

        let fuelbudgetid = 0
        fuelbudgetid= await Math.ceil((this.state.min + (Math.random() * (this.state.max - this.state.min))))
        await this.setState({fuelbudgetid: fuelbudgetid})
        console.log(this.state.fuelbudgetid)

        const data = await this.saveFuelBudget({
            fuelbudgetid: this.state.fuelbudgetid,
            totalfuelbudget: this.state.totalfuelbudget,
            budgetsetdate: this.state.budgetsetdate,
            budgetsetby: this.state.budgetsetby

        })
        console.log(data)
        alert("Details are saved")
        this.setState({formFlag:false})

    }

        updateHandler() {
        
        console.log('update handler')
        window.location.replace('/updatebudget')

    }
    componentDidMount(){
        this.getTotalFuelBudget();
    }
    
    wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

    async  something() {
        console.log("this might take some time....");
        await this.wait(1000);
        if(this.state.fuelbudgetdetails.length == 0) {this.setState({formFlag:true})}
        else {this.setState({formFlag:false})}
        console.log("this done!")
    }
    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }

        
       this.something()
        if(this.state.formFlag){
            console.log('this check running')
            return(
            
                localStorage.getItem("adminid") ?
    
                    <div class="login-wrapper">
                    <Drawer />
                         
    
                    <div>
     
                        <h2>Fuel Budget</h2>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <p>Total Fuel Budget:</p>
                                <input type="number"  class="text_input" aria-required={true} required step={0.01} onChange={e => this.setState({totalfuelbudget: e.target.value})} />
                            </label>
                            <br/>
    
    
                            <label>
                                <p>Fuel Budget Date:</p>
                                <input type="date" class="text_input" aria-required={true} required onChange={e => this.setState({budgetsetdate: e.target.value})} />
                            </label>
                            <br/>
    
    
    
                            <label>
                                <p>Fuel Budget Set By:</p>
                                <input type="text" class="text_input" aria-required={true} required onChange={e => this.setState({budgetsetby: e.target.value})} />
                            </label>
    
                            <br/>
                            <br/>
    
    
                            <button type="submit" value="Save">Save</button>
    
    
                        </form>
                    </div>
    
    
                </div> :
                    <div> Admin not Logged in</div>
            )
        }
        

    if(!this.state.formFlag){
        return(
           <>
            <Drawer />
            <br></br>
            <br></br>
            <br></br>
            <table>
                
                <tr>
                    <th>Total Budget</th>
                    <th>Budget Date</th>
                    <th>Action</th>
                </tr>
                {this.state.fuelbudgetdetails.map((value) => {
                    localStorage.setItem('fuelBudgetID',value.fuelbudgetid)
                    return(
                        <tr>
                            <td>{value.totalfuelbudget}</td>
                            <td>{value.budgetsetdate}</td>
                            <td><Button onClick={this.updateHandler} variant="contained" color="secondary">Update Budget</Button></td>
                        </tr>
                    )
                })}
            </table>
            </>
        )
    }


    }
}