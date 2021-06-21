import React from 'react';
import Axios from '../../apis/Axios';
import {Button, Form} from 'react-bootstrap'
import getCompaniesAction from "../../actions/GetCompanies";
import { connect } from "react-redux";

class AddLine extends React.Component {

    constructor(props){
        super(props);

        let line = {
            availableSeats: 0,
            price: 0,
            scheduled: "",
            destination: "",
            companyDTO: null
        }

        this.state = {line: line, companies: []};
    }

    componentDidMount(){
        this.props.getCompanies();
    }

    getCompanies() {
        Axios.get('/companies')
            .then(res => {
                 // handle success
                 console.log(res);
                 this.setState({companies: res.data});
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Unable to get companies');
            });
    }

    
    onInputChange(e) {
        let input = e.target;
    
        let name = input.name;
        let value = input.value;
    
        let line = this.state.line;
        line[name] = value;
    
        this.setState({ line: line });
        console.log(this.state.line)
    }

    companySelectionChange(e) {

        let companyId = e.target.value;
        let company = this.props.companies.find((company) => company.id == companyId);
        console.log(company)

        let line = this.state.line;
        line.companyDTO = company;

        this.setState({line: line});
        console.log(this.state.line)

    }

    create(event) {
        event.preventDefault();

        let line = this.state.line;

            let lineDTO = {
                availableSeats: line.availableSeats,
                price: line.price,
                scheduled: line.scheduled,
                destination: line.destination,
                companyDTO: line.companyDTO
            }

        Axios.post('/lines', lineDTO)
        .then(res => {
            // handle success
            console.log(res);
           
            alert('Line was added successfully!');
            this.props.history.push('/lines');
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Line is not added!');
         });
    }

    render() {
        return (
            <div>
                <h1>Add line</h1>
                <Form>
                    <Form.Label htmlFor="lavailableSeats">Available Seats</Form.Label><br/>
                    <Form.Control id="lavailableSeats" type="number" name="availableSeats" onChange={(e) => this.onInputChange(e)}/><br/>
                    <Form.Label htmlFor="lprice">Price</Form.Label><br/>
                    <Form.Control id="lprice" type="number" name="price" onChange={(e) => this.onInputChange(e)}/><br/>
                    <Form.Label htmlFor="lscheduled">Scheduled</Form.Label><br/>
                    <Form.Control id="lscheduled" type="text" name="scheduled" onChange={(e) => this.onInputChange(e)}/><br/>
                    <Form.Label htmlFor="ldestination">Destination</Form.Label><br/>
                    <Form.Control id="ldestination" type="text" name="destination" onChange={(e) => this.onInputChange(e)}/><br/>

                    <Form.Label htmlFor="lcompanyDTO">Company</Form.Label><br/>
                    <Form.Control as="select" id="lcompanyDTO" onChange={event => this.companySelectionChange(event)}>
                        <option></option>
                        {
                            this.props.companies.map((company) => {
                                return (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                )
                            })
                        }
                    </Form.Control><br/>
                    
                    <Button className="btn btn-primary" onClick={(event)=>{this.create(event);}}>Add</Button>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    // console.log(state);
    return { companies: state.companies };
  };
  
  export default connect(mapStateToProps, {
    getCompanies: getCompaniesAction,
  })(AddLine);