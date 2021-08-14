import React, {Component} from "react";

class GetBookingByID extends Component{
    constructor(props) {
        super(props);
        this.state={
            bookingdetails:[]
        }
    }

    async getBookingByID(bookingid){
        return fetch("https://fmts.herokuapp.com/api/getbookingbyid", {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaton/json'
            },
            body: JSON.stringify(bookingid)

        })
    .then(data => JSON(data))

    }

    componentDidMount() {
        this.getBookingByID()
    }

    render() {
        return(
            <div>
                <h2>Get Booking By ID</h2>
            </div>
        )
    }

}