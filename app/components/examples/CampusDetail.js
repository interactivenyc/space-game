import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Student from './Student';
import Campus from './Campus';
import axios from 'axios';

class CampusDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            campus: { students: [] }
        };
    }

    async componentDidMount() {
        try {
            let campusId = this.props.match.params.campusId;
            let response = await axios.get(`/api/campuses/${campusId}`);
            let campus = response.data;

            this.setState({
                campus
            });
        } catch (error) {
            console.error(error);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.campus.id === nextState.campus.id) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="campus-detail">
                <Campus campus={this.state.campus} />
                <div>
                    <h3>STUDENTS AT THIS LOCATION:</h3>
                    <hr />
                </div>
                {this.state.campus.students.map((student) => {
                    return <Student key={student.id} student={student} />;
                })}
            </div>
        );
    }
}

export default withRouter(CampusDetail);
