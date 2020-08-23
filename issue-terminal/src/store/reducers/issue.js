import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    issues: [],
    loading: false,
    newIssueRedirectPath: '/',
    uploadingIssueToDbCompleted: false
}

const createIssueStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        uploadingIssueToDbCompleted: true
    })
}

const createIssueSuccess = (state, action) => {
    const newIssue = updateObject(action.issueData, { id: action.issueId })
    return updateObject(state, {
        loading: false,
        issues: state.issues.concat(newIssue),
        uploadingIssueToDbCompleted: true
    });
}
const createIssueFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        uploadingIssueToDbCompleted: false
    })
}
const fetchIssuesStart = (state, action) => {
    return updateObject(state, { loading: true })
}
const fetchIssuesSuccess = (state, action) => {
    console.log(`[store reducer issue]`, action.issues);
    return updateObject(state, {
        issues: action.issues,
        loading: false
    });
}
const fetchIssuesFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const setNewIssueRedirectPath = (state, action) => {
    console.log(`!!!!!!!!!!! [store reducer issue] setNewIssueRedirectPath`, action.path);
    return updateObject(state, { newIssueRedirectPath: action.path })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ISSUE_START: return createIssueStart(state, action);
        case actionTypes.CREATE_ISSUE_SUCCESS: return createIssueSuccess(state, action);
        case actionTypes.CREATE_ISSUE_FAIL: return createIssueFailed(state, action);
        case actionTypes.FETCH_ISSUES_START: return fetchIssuesStart(state, action);
        case actionTypes.FETCH_ISSUES_SUCCESS: return fetchIssuesSuccess(state, action);
        case actionTypes.FETCH_ISSUES_FAIL: return fetchIssuesFail(state, action);
        case actionTypes.SET_NEW_ISSUE_REDIRECT_PATH: return setNewIssueRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;