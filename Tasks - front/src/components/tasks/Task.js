  
import React from 'react';
import Axios from '../../apis/Axios';
import {Table, Button, Form} from 'react-bootstrap'

class Task extends React.Component {

    constructor(props){
        super(props);

        this.state = { 
            tasks: [],
            sprints:[],
            search: {name:"", sprintId: null},
            pageNo: 0, 
            totalPages: 0
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.getTasks(0);
        this.getSprints();
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
                alert('Error occured please try again!');
            });
    }

    changeState(taskId) {
        Axios.get('/states/' + taskId)
        .then(res => {
            // handle success
            console.log(res.data)
            alert('Tasks stete successfully changed!');
            window.location.reload()
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Tasks stete is not changed');
         });
    }

    delete(taskId) {
        Axios.delete('/tasks/' + taskId)
        .then(res => {
            console.log(res);
            alert("Task is deleted!")
            window.location.reload()
        })
        .catch(error => {
            console.log(error);
            alert("Task is not deleted!")
        })
    }

    renderTasks() {
        return this.state.tasks.map ((task) => {
            return (
                <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.employee}</td>
                    <td>{task.points}</td>
                    <td>{task.sprint.name}</td>
                    <td>{task.state.name}</td>
                    <td><button className="btn btn-primary" onClick={() => this.changeState(task.id)}>Change state</button></td>
                    <td><button className="btn btn-success" onClick={() => this.edit(task.id)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={() => this.delete(task.id)}>Delete</button></td>
                </tr>
            )
        })
    }

    searchValueChange(e) {
        let control = e.target;

        let name = control.name
        let value = control.value

        let search = this.state.search

        search[name] = value

        this.setState({search:search})
        console.log(this.state.search)

    }

    getTasks(pageNo) {
        let config = {
            params: {
                pageNo: pageNo
            },
          }

        if (this.state.search.name != "") {
            config.params.name = this.state.search.name;
        }  
        if (this.state.search.sprintId != -1) {
            config.params.sprintId = this.state.search.sprintId;
        }  

        Axios.get('/tasks', config)
            .then(res => {
                 // handle success
                 console.log(res);
                 this.setState({
                    tasks: res.data,
                    totalPages:res.headers["total-pages"]});
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Error occured please try again!');
            });
    }

    search() {
        this.getTasks();
    }

    addTask() {
        this.props.history.push('/tasks/add')
    }
    
    edit(taskId) {
        this.props.history.push('/tasks/edit/'+ taskId);
    }

    render () {
        return (
            <div>
                <h1>Tasks</h1>
                <Button className="btn btn-primary" type="submit" onClick = {() => this.addTask()}>Add task</Button><br/>
                <Form>
                    <Form.Label htmlFor="tName">Task name</Form.Label><br/>
                    <Form.Control id="tName" name="name" type="text" onChange={(e) => this.searchValueChange(e)}/><br/>
                    <Form.Label htmlFor="tSprintId">Sprint</Form.Label><br/>
                    <Form.Control as="select" id="tSprintId" name="sprintId" onChange={(e) => this.searchValueChange(e)}>
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
                    
                    <Button style={{ marginTop: "1px" }} className="btn btn-primary" onClick={()=>{this.search();}}>Search</Button>
                </Form>

                <Table style={{marginTop:30}} className="table table-dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Employee</th>
                        <th>Points</th>
                        <th>Sprint</th>
                        <th>State</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderTasks()}
                </tbody>
                </Table>

                <div>
                    <button disabled={this.state.pageNo==0} className="btn btn-primary" onClick={() =>this.getTasks(this.state.pageNo = this.state.pageNo - 1)}>Previous</button>
                    <button disabled={this.state.pageNo==this.state.totalPages-1} className="btn btn-primary" onClick={() =>this.getTasks(this.state.pageNo = this.state.pageNo + 1)}>Next</button>
                </div>
            </div>
        )
    }
}

export default Task;