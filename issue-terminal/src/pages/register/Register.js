import React, { Component } from 'react';

import StyledButton from '../../components/ui/styledButton/StyledButton';
import style from './register.module.css';
import PageLayout from '../../components/pageLayout/PageLayout';
import Input from '../../components/ui/input/Input';

class RegisterPage extends Component {
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


    submitHandle = async (event) => {
        event.preventDefault();
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
                        <StyledButton title="Register" btnType="Success">REGISTER</StyledButton>
                    </div>
                </form>
            </PageLayout>
        );
    };
};

export default RegisterPage;