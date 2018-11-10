import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import history from './history';
import { logError, sortArrayByObjectProp, colorLog } from './utilities';

//CONSTS

const GOT_STUDENTS = 'GOT_STUDENTS';
const STUDENT_ADDED = 'STUDENT_ADDED';
const STUDENT_UPDATED = 'STUDENT_UPDATED';
const STUDENT_DELETED = 'STUDENT_DELETED';
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const CAMPUS_ADDED = 'CAMPUS_ADDED';
const CAMPUS_UPDATED = 'CAMPUS_UPDATED';
const CAMPUS_DELETED = 'CAMPUS_DELETED';

const loggingMiddleware = createLogger({ collapsed: true });

// ACTION CREATORS --------------------------------------

export const gotStudents = (students) => ({ type: GOT_STUDENTS, students });
export const gotCampuses = (campuses) => ({ type: GOT_CAMPUSES, campuses });
export const studentAdded = (student) => ({ type: STUDENT_ADDED, student });
export const campusAdded = (campus) => ({ type: CAMPUS_ADDED, campus });
export const studentUpdated = (student) => ({ type: STUDENT_UPDATED, student });
export const campusUpdated = (campus) => ({ type: CAMPUS_UPDATED, campus });
export const studentDeleted = (student) => ({ type: STUDENT_DELETED, student });
export const campusDeleted = (campus) => ({ type: CAMPUS_DELETED, campus });

// THUNKS --------------------------------------

export const fetchStudents = () => {
    colorLog('[ store ] fetchStudents', 'red', true);
    return async (dispatch) => {
        const response = await axios.get('/api/students');
        const students = response.data;
        sortArrayByObjectProp(students, 'id');
        const action = gotStudents(students);
        dispatch(action);
    };
};

export const fetchCampuses = () => {
    colorLog('[ store ] fetchCampuses', 'green', false);
    return async (dispatch) => {
        const response = await axios.get('/api/campuses');
        const campuses = response.data;
        const action = gotCampuses(campuses);
        dispatch(action);
    };
};

export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware.withExtraArgument({ axios }), loggingMiddleware)
);

export const addStudent = (student) => {
    console.log('[ store ] addStudent', student);
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/students/add-student', student);
            const newStudent = response.data;

            if (newStudent.error) {
                logError(newStudent.error);
            } else {
                const action = studentAdded(newStudent);
                dispatch(action);
                history.push(`/students/${newStudent.id}`);
            }
        } catch (error) {
            logError(error);
        }
    };
};

export const updateStudent = (student) => {
    console.log('[ store ] updateStudent', student);
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/students/${student.id}`, student);
            const updatedStudent = response.data;

            if (updatedStudent.error) {
                logError(updatedStudent.error);
            } else {
                const action = studentUpdated(updatedStudent);
                dispatch(action);
                history.push(`/students/${updatedStudent.id}`);
            }
        } catch (error) {
            logError(error);
        }
    };
};

export const deleteStudent = (student) => {
    console.log('[ store ] deleteStudent', student);
    return async (dispatch) => {
        try {
            await axios.delete(`/api/students/${student.id}`);

            console.log('[ store ] deleteStudent AXIOS COMPLETE', student);

            const action = studentDeleted(student);
            dispatch(action);
            history.push(`/students`);
        } catch (error) {
            logError(error);
        }
    };
};

export const addCampus = (campus) => {
    console.log('[ store ] addCampus', campus);
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/campuses/add-campus', campus);
            const newCampus = response.data;
            const action = campusAdded(newCampus);
            dispatch(action);
            history.push(`/campuses/${newCampus.id}`);
        } catch (error) {
            logError(error);
        }
    };
};

export const updateCampus = (campus) => {
    console.log('[ store ] updateCampus', campus);
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/campuses/${campus.id}`, campus);
            // const response = await axios.put(`/api/campuses/`, campus);

            console.log('[ store ] updateCampus AXIOS COMPLETE');

            const updatedCampus = response.data;
            const action = campusUpdated(updatedCampus);
            dispatch(action);
            history.push(`/campuses/${updatedCampus.id}`);
        } catch (error) {
            logError(error);
        }
    };
};

export const deleteCampus = (campus) => {
    console.log('[ store ] deleteCampus', campus);
    return async (dispatch) => {
        try {
            await axios.delete(`/api/campuses/${campus.id}`);

            console.log('[ store ] deleteCampus AXIOS COMPLETE', campus);

            const action = campusDeleted(campus);
            dispatch(action);
            history.push(`/campuses`);
        } catch (error) {
            logError(error);
        }
    };
};
