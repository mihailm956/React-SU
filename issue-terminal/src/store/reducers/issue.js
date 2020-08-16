import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../utils/utility';

const initialState = {
    issues: [],
    loading: false,
}

const createIssueStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const createIssueSuccess = (state, action) => {
    const newIssue = updateObject(action.issueData, { id: action.issueId })
    return updateObject(state, {
        loading: false,
        issues: state.issues.concat(newIssue)
    });
}
const createIssueFailed = (state, action) => {
    return updateObject(state, { loading: false })
}
const fetchIssuesStart = (state, action) => {
    return updateObject(state, { loading: true })
}
const fetchIssuesSuccess = (state, action) => {
    return updateObject(state, {
        issues: action.issues,
        loading: false
    });
}
const fetchIssuesFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ISSUE_START: return createIssueStart(state, action);
        case actionTypes.CREATE_ISSUE_SUCCESS: return createIssueSuccess(state, action);
        case actionTypes.CREATE_ISSUE_FAIL: return createIssueFailed(state, action);
        case actionTypes.FETCH_ISSUES_START: return fetchIssuesStart(state, action);
        case actionTypes.FETCH_ISSUES_SUCCESS: return fetchIssuesSuccess(state, action);
        case actionTypes.FETCH_ISSUES_FAIL: return fetchIssuesFail(state, action);
        default: return state;
    }
}

export default reducer;