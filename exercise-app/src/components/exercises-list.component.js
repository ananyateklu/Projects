import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button'; 


const Exercise = props => (
    <tr>
        <td>{ props.exercise.username }</td>
        <td>{ props.exercise.description }</td>
        <td>{ props.exercise.duration }</td>
        <td>{ props.exercise.date.substring(0,10) }</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}><Button variant="outline-primary">edit</Button></Link> | <Button variant="outline-danger" href="#" onClick={() => {props.deleteExercise(props.exercise._id) }} >Delete</Button>
        </td>
        
    </tr>

)
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []}
    }

    componentDidMount() {
        axios.get('http://localhost:3000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data})
        })
            .catch((error) => {
                console.log(error);
        })
    }

    deleteExercise(id) {
        this.setState({
            exercises: this.state.exercises.filter(el => el.id !== id),
        });
        axios.delete('http://localhost:3000/exercises/'+id)
        .then(response => {
            console.log(response.data);
            window.location="/";
    })
}
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
        })
    }

    render() {
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}