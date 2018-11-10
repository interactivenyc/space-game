import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Student from './Student';
import Campus from './Campus';
import axios from 'axios';

class StudentDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: {}
        };
    }
    async componentDidMount() {
        try {
            let studentId = this.props.match.params.studentId;
            let response = await axios.get(`/api/students/${studentId}`);
            let student = response.data;

            this.setState({
                student
            });
        } catch (error) {
            console.error(error);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.student.id === nextState.student.id) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="student-detail">
                <Student student={this.state.student} />
                <div>
                    <h5>STUDENT ATTENDS:</h5>
                    <hr />
                </div>

                {this.state.student.campus ? <Campus campus={this.state.student.campus} /> : ''}
            </div>
        );
    }
}

export default withRouter(StudentDetail);
