import React, { Fragment, Component } from 'react';
import { toast } from 'react-toastify';

import Modal from '../../components/ui/modal/Modal'
import 'react-toastify/dist/ReactToastify.css';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                error: null
            }
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {

                this.setState({ error: null })
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => {
                toast.success("Succesfully logged in !!!", {
                    position: toast.POSITION.TOP_RIGHT
                })
                
                return res
            }, err => {
                toast.error(`"ERROR:${err}"`, {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.setState({ error: err });
            })
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
            toast.error("ERROR: Something bad happened", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Fragment>
                    {/* <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal> */}
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
};

export default withErrorHandler;


