import LgBox from '../../wrappers/LgBox';
import Crop1X1 from '../../containers/Crops/Crop1X1';
import { Form, Col, FormGroup, Label, Input, Button, Container, FormFeedback, FormText } from 'reactstrap';
import React, { Component } from "react";
import './CreatePlant.css';

class CreatePlant extends Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <LgBox>
                <div className='x' onClick={this.props.exit}>x</div>
                <Crop1X1
                    imgSrc={this.props.imgSrc}
                    imgSrcExt={this.props.imgSrcExt}
                    aspect={{aspect: 1/1}}
                    sendBase64={this.addPlant}
                />
                <Form>
                    <FormGroup>
                        <Label for="input-plant">Plant</Label>
                        <Input type="text" name="plant" id="input-plant" placeholder="Sunflower" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="select-health">Health</Label>
                        <Input type="select" name="health" id="select-health">
                            <option>Thriving</option>
                            <option>Sick</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="input-about">About your plant</Label>
                        <Input type="textarea" name="about" id="input-about" />
                    </FormGroup>
                </Form>
            </LgBox>
        )
    }
}

export default CreatePlant;