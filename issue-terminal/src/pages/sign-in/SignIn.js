import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import style from './sign-in.module.css';
import Input from '../../components/ui/input/Input';
import StyledButton from '../../components/ui/styledButton/StyledButton';
import PageLayout from '../../components/pageLayout/PageLayout';
import { signIn } from '../../utils/authService';
import { updateObject, checkValidity } from '../../utils/utility';

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

    submitHandle = async (event) => {
        event.preventDefault();

        const fieldData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        }

        signIn(fieldData.email, fieldData.password)
            .then(result => {
                console.log("[Sign-In] [custom promise] [result] " + result)
                this.props.history.push(`/`);
            })
            .catch(err => console.log("[Sign-In] [custom promise] [reject] " + err))
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

        return (
            <PageLayout>
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

export default withRouter(SignInPage);