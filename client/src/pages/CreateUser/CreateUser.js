import React, { Component } from "react";
import API from '../../utils';
import './CreateUser.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import DragNDrop from '../../containers/PostAPlant/DragNDrop';
import { Form, Col, FormGroup, Label, Input, Button, Container, FormFeedback, FormText } from 'reactstrap';

class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            about: null,
            validate: {
                emailState: null
            },
            next: false,
            image: null
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log(this.state.validate);
        console.log(value);
        this.setState({
            [name]: value
        });
    }

    validateEmail = e => {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state;
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({
            validate: validate,
            email: e.target.value
        })
    }

    handleNextBtn = event => {
        event.preventDefault();
        this.setState({
            next: true
        })
    }

    handleSubmit = (image) => {
        console.log(image.data);
        const { firstname, lastname, email, password, about } = this.state
        if (firstname && lastname && email && password) {
            API.User.create({
                "username": email,
                "password": password,
                "fullname": firstname + ' ' + lastname,
                "firstname": firstname,
                "lastname": lastname,
                "about": about,

            }).then(result => console.log(result.data));
            // window.location('/profile/' + result.data)
        }
    }

    render() {
        return (
            <div>
                <div className='form_user'>
                    <br /><br />
                    <Container className="App">
                        <h2 className='text-center'>New Account</h2>
                        <br />
                        <form>
                        </form>
                        <Form className="form">
                            <Col>
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <Input
                                        type="text"
                                        className="input"
                                        name="firstname"
                                        id="firstnameInput"
                                        placeholder="John"
                                        onChange={this.handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastname"
                                        className="input"
                                        id="lastnameInput"
                                        placeholder="Doe"
                                        onChange={this.handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <br />
                            <Col>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="exampleEmail"
                                        className="input"
                                        placeholder="example@email.com"
                                        onChange={this.validateEmail}
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
                                        type="password"
                                        name="password"
                                        id="examplePassword"
                                        className="input"
                                        placeholder="********"
                                        onChange={this.handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <br />
                            <Col>
                                <FormGroup>
                                    <Label>About You</Label>
                                    <FormText>Tell us about yourself and you as a plant grower!</FormText>
                                    <br />
                                    <Input type="textarea" className="input" onChange={this.handleInputChange} name="about" id="aboutInput" rows='10' />
                                </FormGroup>
                            </Col>
                            <br /><br />
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                    </Container>
                    <br /><br />
                </div>
            </div>
        )
    }
}

export default CreateUser;