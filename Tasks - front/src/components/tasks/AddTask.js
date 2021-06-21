import React from 'react';
import Axios from '../../apis/Axios';
import {Button, Form} from 'react-bootstrap'

class AddTask extends React.Component {

    constructor(props){
        super(props);

        let task = {
            name: "",
            employee: "",
            points: 0,
            sprint: null,
            state: null
        }

        this.state = {task: task, states: [], sprints: []};
    }

    componentDidMount(){
        this.getStates();
        this.getSprints();
    }

    getStates() {
        Axios.get('/states')
            .then(res => {
                 // handle success
                 console.log(res);
                 this.setState({states: res.data});
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Unable to reach states!');
            });
    }

    getSprints() {
        Axios.get('/sprints')
            .then(res => {
                 // handle success
                 console.log(res);
                 this.setState({sprints: res.data});
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Unable to reach sprints!');
            });
    }

    onInputChange(e) {
        let input = e.target;
    
        let name = input.name;
        let value = input.value;
    
        let task = this.state.task;
        task[name] = value;
    
        this.setState({ task: task });
        console.log(this.state.task)
    }

    sprintSelectionChange(e) {
        let sprintId = e.target.value;
        let sprint = this.state.sprints.find((sprint) => sprint.id == sprintId);
        console.log(sprint)

        let task = this.state.task;
        task.sprint = sprint;

        this.setState({task: task});
        console.log(this.state.task)
    }

    stateSelectionChange(e) {
        let stateId = e.target.value;
        let state = this.state.states.find((state) => state.id == stateId);
        console.log(state)

        let task = this.state.task;
        task.state = state;

        this.setState({task: task});
        console.log(this.state.task)
    }

    create(e) {
        e.preventDefault();

        let task = this.state.task;

            let taskDTO = {
                name: task.name,
                employee: task.employee,
                points: task.points,
                sprint: task.sprint,
                state: task.state
            }

        Axios.post('/tasks', taskDTO)
        .then(res => {
            // handle success
            console.log(res);
           
            alert('Task was added successfully!');
            this.props.history.push('/tasks');
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Unable to create task!');
         });
    }

    render () {
        return (
            <div>
                <h1>Add task</h1>
                <Form>
                    <Form.Label htmlFor="tName">Name</Form.Label><br/>
                    <Form.Control id="tName" type="text" name="name" onChange={(e) => this.onInputChange(e)}/><br/>
                    <Form.Label htmlFor="tEmployee">Employee</Form.Label><br/>
                    <Form.Control id="tEmployee" type="text" name="employee" onChange={(e) => this.onInputChange(e)}/><br/>
                    <Form.Label htmlFor="tPoints">Points</Form.Label><br/>
                    <Form.Control id="tPoints" type="number" name="points" onChange={(e) => this.onInputChange(e)}/><br/>
                    <Form.Label htmlFor="tSprint">Sprint</Form.Label><br/>
                    <Form.Control as="select" id="tSprint" onChange={event => this.sprintSelectionChange(event)}>
                        <option></option>
                        {
                            this.state.sprints.map((sprint) => {
                                return (
                                    <option key={sprint.id} value={sprint.id}>
                                        {sprint.name}
                                    </option>
                                )
                            })
                        }
                    </Form.Control><br/>
                    <Form.Label htmlFor="tState">State</Form.Label><br/>
                    <Form.Control as="select" id="tState" onChange={event => this.stateSelectionChange(event)}>
                        <option></option>
                        {
                            this.state.states.map((state) => {
                                return (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                )
                            })
                        }
                    </Form.Control><br/>
                    <button className="btn btn-primary" onClick={(event)=>{this.create(event);}}>Add</button>
                </Form>
            </div>
        )
    }
}

export default AddTask;