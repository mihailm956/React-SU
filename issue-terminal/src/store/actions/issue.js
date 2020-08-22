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

        axios.post(`projects/${issueData.issueProject}/issues.json?auth=` + token, issueData)
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
        type: actionTypes.FETCH_ISSUES_SUCCESS,
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

// export const fetchOnlyUserIssues = (token, userId) => {
//     return dispatch => {
//         dispatch(fetchIssuesStart());
//         const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
//         axios.get('/issues.json' + queryParams)
//             .then(res => {
//                 const fetchedIssues = [];
//                 for (const key in res.data) {
//                     fetchedIssues.push({
//                         ...res.data[key],
//                         id: key
//                     });
//                 }
//                 dispatch(fetchIssuesSuccess(fetchedIssues));
//             })
//             .catch(err => {
//                 dispatch(fetchIssuesFail(err));
//             })
//     }
// }

export const fetchAllIssues = (token, userId) => {
    return dispatch => {
        dispatch(fetchIssuesStart());
        axios.get('/issues.json')
            .then(res => {
                console.log(`[store actions issue] [fetchAllIssues] res:`, res);
                const fetchedIssues = [];
                for (const key in res.data) {
                    fetchedIssues.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(`[store actions issue] [fetchAllIssues] fetchedIssues:`, fetchedIssues);

                const fetchedIssuesMapped = fetchedIssues.map(dataEntry => {
                    return {
                        "project": dataEntry.issueProject || '-',
                        "createdDate": dataEntry.issueCreated || '-',
                        "severity": dataEntry.issueSeverity,
                        "reporter": dataEntry.userEmail,
                        "dueDate": dataEntry.issueDueDate || '-',
                        "status": "submited",
                        "isItReproducible": dataEntry.issueReproducible,
                        "issue": dataEntry.issueName,
                        "dbId": dataEntry.id
                    }
                });

                console.log(`[store actions issue] [fetchAllIssues] fetchedIssuesMapped:`, fetchedIssuesMapped);



                dispatch(fetchIssuesSuccess(fetchedIssuesMapped));
            })
            .catch(err => {
                dispatch(fetchIssuesFail(err));
            })
    }
}