import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../../components/ui/spinner/Spinner';
import StyledButton from '../../components/ui/styledButton/StyledButton';

class AdminPage extends Component {

    state = {
        availableUsers: [],
        availableProjects: [],
        loadingUsers: true,
        loadingProjects: true,
        showUsers: false
    }

    yautorizationHandler = (event) => {
        event.preventDefault();
        let selectedProject = event.target.elements.selectedProject.value;
        let selectedUserEmail = event.target.elements.selectedUser.value;
        let selectedUserEmailDbId = this.state.availableUsers.find(x => x.email === selectedUserEmail).id

        axios.post(`https://reactworkshop-663c6.firebaseio.com/projects/${selectedProject}/access/${selectedUserEmailDbId}.json`, true)
            .then(res => {
                console.log(`[Pages admin] [yautorizationHandler] added access to ${selectedUserEmail}  in project ${selectedProject} `);

            })
            .catch(err => console.log(err));
    }



    componentDidMount() {
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        // axios.get('/issues.json' + queryParams)
        axios.get('https://reactworkshop-663c6.firebaseio.com/projects.json')
            .then(res => {
                const projects = [];
                for (const key in res.data) {
                    projects.push({
                        ...res.data[key],
                        id: key
                    });
                }

                console.log(`[Pages admin] [componentDidMount] loaded Projects: `, projects);
                this.setState({
                    availableProjects: projects,
                    loadingProjects: false
                })
            })
            .catch(err => console.log(err));

        axios.get('https://reactworkshop-663c6.firebaseio.com/accounts.json')
            .then(res => {
                const users = [];
                for (const acountKey in res.data) {
                    if (res.data.hasOwnProperty(acountKey)) {
                        const accountData = res.data[acountKey];
                        let newObj = { id: acountKey }
                        for (const key in accountData) {
                            if (accountData.hasOwnProperty(key)) {
                                const dataObject = accountData[key];
                                users.push({
                                    ...dataObject,
                                    id: acountKey
                                });
                            }
                        }
                    }
                }

                console.log(`[Pages admin] [componentDidMount] loaded usersss: `, users);
                this.setState({
                    availableUsers: users,
                    loadingUsers: false
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let form = <Spinner />

        let showProjectSelectMenu = !this.state.loadingProjects && (this.state.availableProjects && this.state.availableProjects.length > 0)
        let showUsersSelectMenu = !this.state.loadingUsers && (this.state.availableUsers && this.state.availableUsers.length > 0)

        if (showProjectSelectMenu && showUsersSelectMenu) {
            form = <div>Projects : </div>

            let projectsAsOption = (
                <select name="selectedProject" defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" hidden disabled>Choose a project</option>
                    {
                        this.state.availableProjects.map((projectData, index) => {
                            console.log(projectData);
                            return (
                                <option key={index} value={projectData.id}>{projectData.id}</option>
                            )
                        })
                    }
                </select>
            )

            let usersAsOption = (
                <select name="selectedUser" defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" hidden disabled>Choose a user</option>
                    {
                        this.state.availableUsers.map((userData, index) => {
                            console.log(userData);
                            return (
                                <option key={index} value={userData.email}>{userData.email}</option>
                            )
                        })
                    }
                </select>
            )

            this.state.showUsers = true;
            form = (
                <form onSubmit={this.yautorizationHandler}>
                    <h4>Access</h4>
                    {projectsAsOption}
                    {usersAsOption}
                    <StyledButton>Submit</StyledButton>
                </form>
            )

        }

        return (
            <div>
                {form}
            </div>
        )
    }
}

export default AdminPage;