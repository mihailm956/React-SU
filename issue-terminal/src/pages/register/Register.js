import React, { Component } from 'react';

import Button from '../../components/ui/button/Button';
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
                    placeholder: 'Mail Adress'
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
                    placeholder: 'Password'
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

        const num = 1.344;
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
                    <Button title="Register" btnType="Success">REGISTER</Button>
                    </div>
                </form>
            </PageLayout>
        );
    };
};

export default RegisterPage;