import React from 'react';
import Axios from '../../apis/Axios';
import {Button, Form} from 'react-bootstrap'

class EditLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            lineId: -1, 
            lineAvailableSeats: 0, 
            linePrice: 0, 
            lineScheduled: "",
            lineDestination: "" }
    }

    componentDidMount() {
        this.getLineById(this.props.match.params.id);
     }

     getLineById(lineId) {
        Axios.get('/lines/' + lineId)
        .then(res => {
            // handle success
            console.log(res.data)
            this.setState({lineId: res.data.id, lineAvailableSeats: res.data.availableSeats, linePrice:res.data.price, lineScheduled:res.data.scheduled, lineDestination:res.data.destination  });
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Unable to get line!');
         });
    }

    onAvailableSeatsChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            lineAvailableSeats: value
        }));
    }

    onPriceChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            linePrice: value
        }));
    }

    onScheduledChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            lineScheduled: value
        }));
    }

    onDestinationChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            lineDestination: value
        }));
    }

    edit() {
        var params = {
            'id' : this.state.lineId,
            'availableSeats' : this.state.lineAvailableSeats,
            'price' : this.state.linePrice,
            'scheduled' : this.state.lineScheduled,
            'destination' : this.state.lineDestination
        }

        Axios.put('/lines/' + this.state.lineId, params)
        .then(res => {
            // handle success
            console.log(res);
            alert('Line is successfully changed!');
            this.props.history.push('/lines');
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Line is not changed');
         });
    }

    render() {
        return (
            <div>
                <h1>Edit line</h1>
                <Form>
                    <Form.Label htmlFor="lAvailableSeats">Available Seats</Form.Label><br/>
                    <Form.Control id="lAvailableSeats" type="number" value={this.state.lineAvailableSeats} onChange={(e) => this.onAvailableSeatsChange(e)}/><br/>
                    <Form.Label htmlFor="lPrice">Price</Form.Label><br/>
                    <Form.Control id="lPrice" type="number" value={this.state.linePrice} onChange={(e) => this.onPriceChange(e)}/><br/>
                    <Form.Label htmlFor="lScheduled">Scheduled</Form.Label><br/>
                    <Form.Control id="lScheduled" type="text" value={this.state.lineScheduled} onChange={(e) => this.onScheduledChange(e)}/><br/>
                    <Form.Label htmlFor="lDestination">Destination</Form.Label><br/>
                    <Form.Control id="lDestination" type="text" value={this.state.lineDestination} onChange={(e) => this.onDestinationChange(e)}/><br/>
                    <Button className="btn btn-primary" onClick={() => this.edit()}>Edit</Button>
                </Form>
            </div>
        )
    }
}

export default EditLine;