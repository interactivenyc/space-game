import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';

const Students = (props) => {
    return (
        <div>
            {props.students.map((student) => {
                return <Student key={student.id} student={student} />;
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        students: state.students
    };
};

export default connect(mapStateToProps)(Students);
