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
            min:1,
            max: 70000

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveFuelBudget = this.saveFuelBudget.bind(this);
        // this.updateHandler = this.updateHandler.bind(this);


    }

    async saveFuelBudget(fuelbudgetdetails){

        return fetch("https://fmts.herokuapp.com/api/addfuelbudget?ID="+this.state.fuelbudgetid,
            {method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(fuelbudgetdetails)

            })
            .then(data => {data.json(); window.location.replace('/addfuelbudget');})


    }

    async handleSubmit(e){
        e.preventDefault()
        e.target.reset()

        let fuelbudgetid = 0
        fuelbudgetid= localStorage.getItem('fuelBudgetID')
        await this.setState({fuelbudgetid: fuelbudgetid})
        console.log(this.state.fuelbudgetid)

        const data = await this.saveFuelBudget({
            totalfuelbudget: this.state.totalfuelbudget,
            budgetsetdate: this.state.budgetsetdate,
            budgetsetby: this.state.budgetsetby

        })
        console.log(data)
        alert("Details are saved")

    }


    render() {
        if(!localStorage.getItem("adminid")){
            return(<Auth/>)
        }

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
        
    }
