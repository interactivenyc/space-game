import React from 'react';
import { connect } from 'react-redux';
import Campus from './Campus';

const Campuses = (props) => {
    return (
        <div>
            {props.campuses.map((campus) => {
                return <Campus key={campus.id} campus={campus} />;
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        campuses: state.campuses
    };
};

export default connect(mapStateToProps)(Campuses);
