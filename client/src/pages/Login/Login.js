import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import API from '../../utils';
import { bake_cookie } from 'sfcookies';
import { Link } from 'react-router-dom';
import Profile from '../Profile';
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
            error: null,
            user: false,
        }
    }

    componentDidMount(){
        console.log('login');
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
                    console.log(result);
                    if (result.data.length < 1) {
                        this.setState({
                            error: 'Invalid Username and Password!'
                        })
                    } else {
                        bake_cookie('User', result.data[0]._id);
                        this.setState({
                            user: result.data[0]
                        })
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
            
            <div>{!this.state.user ? (
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
                                <Link className='create' to='/create'>Create Account</Link>
                                <br />
                                <br />
                                <Button onClick={this.validateEmail}>Login</Button>
                            </Form>
                        </Container>
                    </div>
                </div>
            ) : (
                    <Profile user={this.state.user} />
                )}</div>
        );
    }
}

export default Login;
