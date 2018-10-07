import React, { Component } from 'react';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            validate: {
                emailState: null
            }
        }
    }

    validateEmail = e => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state;
        if (emailRex.test(e.target.value)) {
            this.submitForm();
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({validate})
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    submitForm(e) {
        e.preventDefault();
        console.log(`Email: ${ this.state.username }`)
    }

    // handleSubmit(evt) {
    //     evt.preventDefault();

    //     if (this.state.username && this.state.password) {
    //         return API.User.userValidation(this.state.username, this.state.password)
    //             .then(result => {
    //                 if (result.data === null) {
    //                     this.setState({
    //                         error: 'Invalid Username and Password!'
    //                     })
    //                 } else {
    //                     this.props.setUser(result.data)
    //                 }
    //             });
    //     }

    //     if (!this.state.username) {
    //         return this.setState({ error: 'Username is required' });
    //     }

    //     if (!this.state.password) {
    //         return this.setState({ error: 'Password is required' });
    //     }

    //     return this.setState({ error: '' });
    // }

    render() {
        return (
            <Container className="App">
                <h2>Sign In</h2>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="username"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                onChange={this.handleInputChange}
                                valid={this.state.validate.emailState === 'has-success'}
                                invalid={this.state.validate.emailState === 'has-danger'}
                            />
                            <FormFeedback valid>
                                That's a tasty looking email you've got there.
                            </FormFeedback>
                            <FormFeedback invalid>
                                Uh oh! Looks like there is an issue with your email. Please input a correct email.
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                onChange={this.handleInputChange}
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                            />
                        </FormGroup>
                    </Col>
                    <Button onClick={}>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default Login;
