import React, { Component } from 'react';
import axios from 'axios';

import style from './sign-in.module.css';
import Input from '../../components/ui/input/Input';
import StyledButton from '../../components/ui/styledButton/StyledButton';
import Spinner from '../../components/ui/spinner/Spinner';
import PageLayout from '../../components/pageLayout/PageLayout';
import { signIn } from '../../utils/authService';
import { updateObject, checkValidity } from '../../utils/utility';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignInPage extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })
        this.setState({ controls: updatedControls })
    };

    submitHandle = async (event) => {
        event.preventDefault();
        let validForm = true;
        const fieldData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        }
        
        if(!fieldData.email){
            toast.error("ERROR: Enter your email address", {
                position: toast.POSITION.TOP_RIGHT });
            validForm = false;
        }
        if(!fieldData.password){
            toast.error("ERROR: Enter your password", {
                position: toast.POSITION.TOP_RIGHT });
            validForm = false;
        }
        if(validForm){
            this.props.onAuth(fieldData.email, fieldData.password, false)
            // toast.success("Succesfully logged inxxxx", {
            //     position: toast.POSITION.TOP_RIGHT
            // })
        }
    }

    componentDidMount() {
        this.props.onSetAuthRedirectPath();
    }

    render() {
        const formElementsArray = [];
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value || ""}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <PageLayout>
                {authRedirect}
                <form onSubmit={this.submitHandle} className={style.container}>
                    <div className={style.Container}>
                        {form}
                        <br />
                        <StyledButton title="Log in" btnType="Success">SIGN IN</StyledButton>
                    </div>
                </form>
            </PageLayout>
        );
    };
};


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SignInPage, axios));