import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { deleteStudent } from '../store';
import { connect } from 'react-redux';

const Student = (props) => {
    return (
        <div className="student">
            <table>
                <tbody>
                    <tr className="flexbox">
                        <td className="flex-shrink">
                            <Link to={`/students/${props.student.id}`}>
                                <img className="student-img" src={props.student.imageUrl} />
                            </Link>
                        </td>
                        <td>
                            <div className="student-info">
                                <h4>{props.student.firstName + ' ' + props.student.lastName}</h4>
                                <p>
                                    {props.student.email}
                                    <br />
                                    gpa: {props.student.gpa}
                                </p>
                                <div>
                                    <Link to={`/students/${props.student.id}`}>
                                        <button type="button" className="btn-xs btn-warning actionLink">
                                            View Details
                                        </button>
                                    </Link>

                                    <Link to={`/edit-student/${props.student.id}`}>
                                        <button type="button" className="btn-xs btn-warning actionLink">
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn-xs btn-warning actionLink"
                                        onClick={() => {
                                            props.deleteStudent(props.student);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent: (student, history) => dispatch(deleteStudent(student, history))
    };
};

export default withRouter(connect(null, mapDispatchToProps)(Student));
