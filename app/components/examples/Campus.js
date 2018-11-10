import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampus } from '../store';

const Campus = (props) => {
    return (
        <div className="campus">
            <table>
                <tbody>
                    <tr className="flexbox">
                        <td className="flex-shrink">
                            <Link to={`/campuses/${props.campus.id}`}>
                                <img className="campus-img" src={props.campus.imageUrl} />
                            </Link>
                            <br />
                            <Link to={`/campuses/${props.campus.id}`}>
                                <button type="button" className="btn-xs btn-warning actionLink">
                                    View Details
                                </button>
                            </Link>

                            <Link to={`/edit-campus/${props.campus.id}`}>
                                <button type="button" className="btn-xs btn-warning actionLink">
                                    Edit
                                </button>
                            </Link>

                            <button
                                type="button"
                                className="btn-xs btn-warning actionLink"
                                onClick={() => {
                                    props.deleteCampus(props.campus);
                                }}
                            >
                                Delete
                            </button>
                        </td>
                        <td>
                            <div className="campus-info">
                                <h4>{props.campus.name}</h4>
                                <p>{props.campus.address}</p>

                                <br />
                                <p>{props.campus.description}</p>
                            </div>
                        </td>
                        <td />
                    </tr>
                </tbody>
            </table>
            <hr />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteCampus: (student, history) => dispatch(deleteCampus(student, history))
    };
};

export default withRouter(connect(null, mapDispatchToProps)(Campus));
