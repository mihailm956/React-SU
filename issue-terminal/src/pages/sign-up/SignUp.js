import React, { Component } from 'react';
import axios from 'axios';

import style from './sign-up.module.css';
import Input from '../../components/ui/input/Input';
import StyledButton from '../../components/ui/styledButton/StyledButton';
import Spinner from '../../components/ui/spinner/Spinner';
import PageLayout from '../../components/pageLayout/PageLayout';
import { signUp } from '../../utils/authService';
import { updateObject, checkValidity } from '../../utils/utility';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class SignUpPage extends Component {
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
            },
            rePassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'repeat password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
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

    submitHandle = (event) => {
        event.preventDefault();

        const fieldData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            rePassword: this.state.controls.rePassword.value
        }
        console.log("[SignUp] [custom promise] [fieldData] ", fieldData)
        this.props.onAuth(fieldData.email, fieldData.password, true)
        // signUp(fieldData.email, fieldData.password, fieldData.rePassword)
        //     .finally(() => this.setState({ loading: false }))
        //     .then(result => {
        //         console.log("[SignUp] [custom promise] [result] " + result)
        //         this.props.history.push(`/`);
        //     })
        //     .catch(err => console.log("[SignUp] [custom promise] [reject] " + err))
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
                        <StyledButton title="Register" btnType="Success">SIGN UP</StyledButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(SignUpPage, axios));