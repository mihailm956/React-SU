import React, { Component } from 'react'
import axios from '../../../axios-issues';

import Spinner from '../../../components/ui/spinner/Spinner';
import PageLayout from '../../../components/pageLayout/PageLayout';
import style from './IssuePage.module.css';

class IssuePage extends Component {
    state = {
        issueData: {
            createdDate: '',
            issueDetails: '',
            severity: '',
            reporter: '',
            dueDate: '',
            // status: '',
            isItReproducible: '',
            issue: '',
            dbId: '',
        },
        loading: false
    }

    componentDidMount() {
        let param = window.location.pathname.replace('/issues/', '');
        console.log(`[IssuePage componentDidMount] param` + param);
        this.setState({ loading: true })

        axios.get('/issues/' + param + '.json')
            .finally(() => this.setState({ loading: false }))
            .then(res => {
                console.log(`[IssuePage componentDidMount] axios success access to selected issue data`, res.data);
                this.setState({
                    issueData: {
                        createdDate: res.data.issueCreated,
                        issueDetails: res.data.issueDetails,
                        severity: res.data.issueSeverity,
                        reporter: res.data.userEmail,
                        dueDate: res.data.issueDueDate,
                        // status: res.data.status,
                        isItReproducible: res.data.issueReproducible,
                        issue: res.data.issueName,
                        dbId: res.data.id
                    }
                })
            })
            .catch(err => {
                console.log(`[IssuePage componentDidMount] axios fail`);
            })
    }


    render() {

        // let data = (
        //     <div>
        //         <table>
        //             <tbody>
        //                 <tr w3-repeat="customers">
        //                     <td>Issue name:</td>
        //                     <td>{this.state.issue || 'missing'}</td>
        //                 </tr>
        //                 <tr w3-repeat="customers">
        //                     <td>Issue Details:</td>
        //                     <td>{this.state.issueDetails || 'missing'}</td>
        //                 </tr>
        //                 <tr w3-repeat="customers">
        //                     <td>isItReproducible:</td>
        //                     <td>{this.state.isItReproducible || 'missing'}</td>
        //                 </tr>
        //             </tbody>
        //         </table>

        //         {/* <div>Issue name: {this.state.issue || 'missing'}</div>
        //         <div>Issue Details: {this.state.issueDetails || 'missing'}</div>

        //         <div>createdDate: {this.state.createdDate || 'missing'}</div>
        //         <div>severity: {this.state.severity || 'missing'}</div>
        //         <div>reporter: {this.state.reporter || 'missing'}</div>
        //         <div>dueDate: {this.state.dueDate || 'missing'}</div>
        //         <div>status: {this.state.status || 'missing'}</div>
        //         <div>isItReproducible: {this.state.isItReproducible || 'missing'}</div>
        //         <div>issue: {this.state.issue || 'missing'}</div>
        //         <div>dbId: {this.state.dbId || 'missing'}</div> */}
        //     </div>
        // )
        let tbodyData = Object.keys(this.state.issueData).map( (key, index) => {
            return (
                <tr key={key}>
                    <td>{key}</td>
                    <td>{this.state.issueData[key] || 'missing'} </td>
                </tr>
            )
        });
        // let tbodyData = formElementsArray.map(formElement => (
        //     <Input
        //         key={formElement.id}
        //         elementType={formElement.config.elementType}
        //         elementConfig={formElement.config.elementConfig}
        //         value={formElement.config.value || ""}
        //         invalid={!formElement.config.valid}
        //         shouldValidate={formElement.config.validation}
        //         touched={formElement.config.touched}
        //         changed={(event) => this.inputChangedHandler(event, formElement.id)}
        //     />
        // ));

        let data  = (
            <table>
                <tbody>
                    {tbodyData}
                </tbody>
            </table>
        )

        if (this.state.loading) {
            data = <Spinner />
        }

        return (
            <PageLayout>
                <main className={style.Container}>


                    {data}
                </main>
            </PageLayout>
        )
    }
}

export default IssuePage;