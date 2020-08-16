import * as actionTypes from './actionsTypes';
import axios from '../../axios-issues';

export const createIssueSuccess = (id, issueData) => {
    return {
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issueId: id,
        issueData: issueData
    }
}

export const createIssueFail = (error) => {
    return {
        type: actionTypes.CREATE_ISSUE_FAIL,
        error: error
    }
}

export const createIssueStart = () => {
    return {
        type: actionTypes.CREATE_ISSUE_START
    }
}

export const createIssue = (issueData, token) => {
    return dispatch => {
        dispatch(createIssueStart());
        
        console.log(`[Register Issue] [store actions issue] [createIssue] issueData `, issueData);

        axios.post('/issues.json?auth=' + token, issueData)
            .then(response => {
                dispatch(createIssueSuccess(response.data.name, issueData))
                console.log(`[Register Issue] [store actions issue] [createIssue] success`);
            })
            .catch(err => {
                dispatch(createIssueFail(err));
                console.log(`[Register Issue] [store actions issue] [createIssue] fail`);
            });
    }
}

export const createIssueInit = () => {
    return {
        type: actionTypes.CREATE_ISSUE_INIT
    }
}

export const fetchIssuesSuccess = (issues) => {
    return {
        type: actionTypes.CREATE_ISSUE_SUCCESS,
        issues: issues
    }
}

export const fetchIssuesFail = (error) => {
    return {
        type: actionTypes.FETCH_ISSUES_FAIL,
        error: error
    }
}

export const fetchIssuesStart = () => {
    return {
        type: actionTypes.FETCH_ISSUES_START
    }
}

export const fetchOnlyUserIssues = (token, userId) => {
    return dispatch => {
        dispatch(fetchIssuesStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/issues.json' + queryParams)
            .then(res => {
                const fetchedIssues = [];
                for (const key in res.data) {
                    fetchedIssues.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchIssuesSuccess(fetchedIssues));
            })
            .catch(err => {
                dispatch(fetchIssuesFail(err));
            })
    }
}