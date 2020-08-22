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

export const fetchAllAuthorizedIssues = (token, userId) => {
    return dispatch => {
        dispatch(fetchIssuesStart());
        axios.get('/projects.json')
            .then(res => {
                let issues = [];

                for (const projectName in res.data) {
                    if (res.data.hasOwnProperty(projectName)) {
                        const projectData = res.data[projectName];

                        if (projectData['access'] && projectData['access'][userId]) {
                            issues = issues.concat(res.data[projectName]['issues']);
                            console.log(`----------issues`, issues);

                            for (const key in res.data[projectName]['issues']) {
                                issues.push({
                                    ...res.data[projectName]['issues'][key],
                                    id: key
                                });
                            }
                        }
                        else {
                            console.log(`[store action issue] [fetchAllAuthorizedIssues] ${projectName} unauthorized`);
                        }
                    }
                }

                const fetchedIssuesMapped = issues.map(dataEntry => {
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

                console.log(`[store actions issue] [fetchAllAuthorizedIssues] fetchedIssuesMapped:`, fetchedIssuesMapped);

                dispatch(fetchIssuesSuccess(fetchedIssuesMapped));
            })
            .catch(err => {
                dispatch(fetchIssuesFail(err));
            })
    }
}