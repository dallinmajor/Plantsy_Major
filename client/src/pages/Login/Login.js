import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import API from '../../utils';
import { bake_cookie, read_cookie} from 'sfcookies';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback, FormText
} from 'reactstrap';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            password: null,
            validate: {
                emailState: null
            },
            error: null
        }
    }

    componentWillMount() {
        this.isLoggedIn();
    }

    isLoggedIn() {
        const cookie = read_cookie('User');
        if (cookie[0]) {
            window.location.assign('/profile/' + cookie);
        };
    }

    validateEmail = (e) => {
        e.preventDefault();
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state;
        if (emailRex.test(this.state.username)) {
            this.handleSubmit();
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            validate: {
                emailState: null
            }
        });
    };

    handleSubmit() {
        if (this.state.username && this.state.password) {
            return API.User.userValidation(this.state.username, this.state.password)
                .then(result => {
                    if (result.data.length < 1) {
                        this.setState({
                            error: 'Invalid Username and Password!'
                        })
                    } else {
                        bake_cookie('User', result.data[0]._id);
                        window.location.assign('/profile/' + result.data[0]._id);
                    }
                });
        }
        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }
        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }
        return this.setState({ error: '' });
    }

    render() {
        return (
            <div className='lg_box'>
                <div className='login'>
                    <Container className="App">
                        <h2>Sign In</h2>
                        {this.state.error ? (
                            <div className='error'>{this.state.error}</div>
                        ) : null}
                        <br />
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
                            <a href='/create' className='create'>Create Account</a>
                            <br />
                            <br />
                            <Button onClick={this.validateEmail}>Submit</Button>
                        </Form>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Login;
