import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './Main';
import Nav from './Nav';
// import Students from './Students';
// import Campuses from './Campuses';
// import StudentDetail from './StudentDetail';
// import CampusDetail from './CampusDetail';
// import StudentAdd from './StudentAdd';
// import CampusAdd from './CampusAdd';
import store, { fetchStudents, fetchCampuses } from '../store';

class Root extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

        this.props.fetchStudents();
        this.props.fetchCampuses();
    }

    render() {
        return (
            <div>
                <Route path="/" component={Nav} />
                <Switch>
                    <Route exact path="/" component={Main} />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudents: () => dispatch(fetchStudents()),
        fetchCampuses: () => dispatch(fetchCampuses())
    };
};

const mapStateToProps = (state) => {
    return {
        students: state.students,
        campuses: state.campuses
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
