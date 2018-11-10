import { combineReducers } from 'redux';
import { deleteItemFromArrayById } from '../../app/utilities';

const GOT_STUDENTS = 'GOT_STUDENTS';
const STUDENT_ADDED = 'STUDENT_ADDED';
const STUDENT_UPDATED = 'STUDENT_UPDATED';
const STUDENT_DELETED = 'STUDENT_DELETED';
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const CAMPUS_ADDED = 'CAMPUS_ADDED';
const CAMPUS_UPDATED = 'CAMPUS_UPDATED';
const CAMPUS_DELETED = 'CAMPUS_DELETED';

export const initialState = {
    students: [],
    campuses: []
};

const studentReducer = (state = initialState.students, action) => {
    let updatedArray = [];
    switch (action.type) {
        case GOT_STUDENTS:
            return action.students;

        case STUDENT_ADDED:
            return [...state, action.student];

        case STUDENT_UPDATED:
            updatedArray = deleteItemFromArrayById([...state], action.student.id);
            return [...updatedArray, action.student];

        case STUDENT_DELETED:
            updatedArray = deleteItemFromArrayById([...state], action.student.id);
            return updatedArray;

        default:
            return state;
    }
};

const campusReducer = (state = initialState.campuses, action) => {
    let updatedArray = [];
    switch (action.type) {
        case GOT_CAMPUSES:
            return action.campuses;

        case CAMPUS_ADDED:
            return [...state, action.campus];

        case CAMPUS_UPDATED:
            updatedArray = deleteItemFromArrayById([...state], action.campus.id);
            return [...updatedArray, action.campus];

        case CAMPUS_DELETED:
            updatedArray = deleteItemFromArrayById([...state], action.campus.id);
            return updatedArray;

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    students: studentReducer,
    campuses: campusReducer
});

export default rootReducer;
