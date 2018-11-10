import React, { Component } from 'react';
import { addStudent, updateStudent } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { propExistsInArray } from '../utilities';

class StudentAdd extends Component {
    constructor(props) {
        super(props);
        console.log('[ StudentAdd ] constructor mode:', this.props.mode);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            campusId: 1,
            gpa: '',
            imageUrl: '/student.jpg'
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.props.mode === 'edit') {
            const studentId = this.props.match.params.studentId;
            this.props.updateStudent({ ...this.state, id: studentId });
        } else {
            this.props.addStudent(this.state);
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async componentDidMount() {
        if (this.props.mode === 'edit') {
            const studentId = this.props.match.params.studentId;
            let response = await axios.get(`/api/students/${studentId}`);
            let student = response.data;

            this.setState({
                firstName: student.firstName,
                lastName: student.lastName,
                email: student.email,
                campusId: student.campusId,
                gpa: student.gpa,
                imageUrl: student.imageUrl
            });
        }
    }

    render() {
        return (
            <div>
                <h3 className="form-header">{this.props.mode === 'add' ? 'Add Student' : 'Update Student'}</h3>
                <hr />
                <form className="add-form" onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="firstName">First Name:</label>
                            <br />
                            <input
                                className="form-control"
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={(event) => this.onChange(event)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="lastName">Last Name:</label>
                            <br />
                            <input
                                className="form-control"
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={(event) => this.onChange(event)}
                                required
                            />
                        </div>
                    </div>
                    <p />
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="email">Email:</label>
                            <br />
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={(event) => this.onChange(event)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="campus">Select Campus:</label>
                            <br />
                            <select name="campusId" value={this.state.campusId} onChange={this.onChange}>
                                <option key="0" value="none">
                                    SELECT SCHOOL
                                </option>
                                {this.props.campuses.map((campus) => {
                                    return (
                                        <option key={campus.id} value={campus.id}>
                                            {campus.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <p />
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="imageUrl">Image URL:</label>
                            <br />
                            <input
                                className="form-control"
                                type="text"
                                name="imageUrl"
                                value={this.state.imageUrl}
                                onChange={(event) => this.onChange(event)}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="gpa">GPA:</label>
                            <br />
                            <input
                                className="form-control"
                                type="text"
                                name="gpa"
                                value={this.state.gpa}
                                onChange={(event) => this.onChange(event)}
                            />
                        </div>
                    </div>
                    <p />
                    <button className="btn btn-success" type="submit">
                        {this.props.mode === 'add' ? 'Add' : 'Update'} Student
                    </button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: (student) => dispatch(addStudent(student)),
        updateStudent: (student) => dispatch(updateStudent(student))
    };
};

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses,
        students: state.students
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentAdd));
