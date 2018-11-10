import React, { Component } from 'react';
import { addCampus, updateCampus } from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class CampusAdd extends Component {
    constructor(props) {
        super(props);
        console.log('[ CampusAdd ] constructor mode:', this.props.mode);

        this.state = {
            name: '',
            address: '',
            description: '',
            imageUrl: '/campus.png'
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.props.mode === 'edit') {
            const campusId = this.props.match.params.campusId;
            this.props.updateCampus({ ...this.state, id: campusId });
        } else {
            this.props.addCampus(this.state);
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async componentDidMount() {
        if (this.props.mode === 'edit') {
            const campusId = this.props.match.params.campusId;
            let response = await axios.get(`/api/campuses/${campusId}`);
            let campus = response.data;

            this.setState({
                name: campus.name,
                address: campus.address,
                description: campus.description,
                imageUrl: campus.imageUrl
            });
        }
    }

    render() {
        return (
            <div>
                <h3 className="form-header">{this.props.mode === 'add' ? 'Add Campus' : 'Update Campus'}</h3>
                <hr />
                <form className="add-form" onSubmit={this.onSubmit}>
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={(event) => this.onChange(event)}
                        required
                    />
                    <p />
                    <label htmlFor="address">Address:</label>
                    <br />
                    <input
                        className="form-control"
                        type="text"
                        name="address"
                        value={this.state.address}
                        onChange={(event) => this.onChange(event)}
                        required
                    />
                    <p />
                    <label htmlFor="description">Description:</label>
                    <br />
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={(event) => this.onChange(event)}
                        required
                    />
                    <p />
                    <label htmlFor="imageUrl">Image URL:</label>
                    <br />
                    <input
                        className="form-control"
                        type="text"
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={(event) => this.onChange(event)}
                    />
                    <p />
                    <button className="btn btn-success" type="submit">
                        {this.props.mode === 'add' ? 'Add' : 'Update'} Campus
                    </button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCampus: (campus) => dispatch(addCampus(campus)),
        updateCampus: (campus) => dispatch(updateCampus(campus))
    };
};

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusAdd));
