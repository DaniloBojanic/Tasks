import React from 'react';
import Axios from '../../apis/Axios';
import {Button, Form} from 'react-bootstrap'

class EditTask extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            id: -1, 
            name: "", 
            employee: "", 
            points: 0 }
    }

    componentDidMount() {
        this.getTaskById(this.props.match.params.id);
    }

    getTaskById(taskId) {
        Axios.get('/tasks/' + taskId)
        .then(res => {
            // handle success
            console.log(res.data)
            this.setState({id: res.data.id, name: res.data.name, employee:res.data.employee, points:res.data.points});
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Unable to get task!');
         });
    }

    edit() {
        var params = {
            'id' : this.state.id,
            'name' : this.state.name,
            'employee' : this.state.employee,
            'points' : this.state.points
        }

        Axios.put('/tasks/' + this.state.id, params)
        .then(res => {
            // handle success
            console.log(res);
            alert('Task successfully changed!');
            this.props.history.push('/tasks');
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Unable to change task!');
         });
    }

    nameChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            name: value
        }));
    }

    employeeChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            employee: value
        }));
    }

    pointsChange = event => {
        console.log(event.target.value);

        const { name, value } = event.target;
        console.log(name + ", " + value);

        this.setState((state, props) => ({
            points: value
        }));
    }

    render () {
        return (
            <div>
                <h1>Edit task</h1>
                <Form>
                    <Form.Label htmlFor="tName">Name</Form.Label><br/>
                    <Form.Control id="tName" type="text" value={this.state.name} onChange={(e) => this.nameChange(e)}/><br/>
                    <Form.Label htmlFor="tEmployee">Employee</Form.Label><br/>
                    <Form.Control id="tEmployee" type="text" value={this.state.employee} onChange={(e) => this.employeeChange(e)}/><br/>
                    <Form.Label htmlFor="tPoints">Points</Form.Label><br/>
                    <Form.Control id="tPoints" type="number" value={this.state.points} onChange={(e) => this.pointsChange(e)}/><br/>
                    <Button className="btn btn-primary" onClick={() => this.edit()}>Edit</Button>
                </Form>
            </div>
        )
    }
}

export default EditTask;