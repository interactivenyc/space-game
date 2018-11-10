import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './Main';
import Game from './Game';
import Nav from './Nav';

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
                    <Route exact path="/game" component={Game} />
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

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Root)
);
