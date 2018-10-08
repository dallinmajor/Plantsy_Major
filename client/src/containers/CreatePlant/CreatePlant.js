import LgBox from '../../wrappers/LgBox';
import Crop1X1 from '../../containers/Crops/Crop1X1';
import { Form, Col, FormGroup, Label, Input, Button, Container, FormFeedback, FormText } from 'reactstrap';
import React, { Component } from "react";
import API from '../../utils';
import './CreatePlant.css';

class CreatePlant extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCropping: true,
            filename: null,
            name: null,
            health: 'thriving',
            about: '',
            error: null
        }
    }

    handlePlantImg = (base64) => {
        this.setState({
            isCropping: false
        })
        this.setState()
        const fd = new FormData();
        fd.append('image', base64);
        API.Image.create(fd)
            .then(res => {
                if (res.data) {
                    this.setState({
                        filename: res.data
                    })
                }
            });
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log(value);
        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        if(this.state.name) {
            API.Plant.createUserPlant(this.props.id)
                .then(res => window.location.assign('/profile'+this.props.id));
        } else {
            this.setState({
                error: 'A plant name is required.'
            })
        }
    }

    render() {

        return (
            <LgBox>
                <div className='x' onClick={this.props.exit}>x</div>
                {this.state.isCropping ? (<Crop1X1
                    imgSrc={this.props.imgSrc}
                    imgSrcExt={this.props.imgSrcExt}
                    aspect={{ aspect: 1 / 1 }}
                    sendBase64={this.handlePlantImg}
                />) : (
                        <div className='center'>
                            {this.state.filename ? <img className='lg-plant-image' src={'/api/image/' + this.state.filename} alt='cropped picture of your plant' /> : null}
                        </div>
                    )}
                    <br/><br/>
                <Form>
                    <FormGroup>
                        <Input type="text" name="name" id="input-plant" onChange={this.handleInputChange} placeholder="What's the name of you plant?" />
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <FormText>Is your plant in need of help?</FormText>
                        <Input type="select" name="health" onChange={this.handleInputChange} id="select-health">
                            <option value='thriving'>Nope</option>
                            <option value='sick'>Yes please!</option>
                        </Input>
                    </FormGroup>
                    <FormText>Don't be afraid to include gardening tips or ask others for help!</FormText>
                    <FormGroup>
                        <Input type="textarea" name="about" id="input-about" onChange={this.handleInputChange}  placeholder='What make your plant special to you?' />
                    </FormGroup>
                    <br />
                    {!this.state.filename ? (
                        <h4 className='imageWarning'>Don't forget to Crop that image!</h4>
                    ) : (
                        <div>
                            {this.state.error?(<h4 className='imageWarning'>{this.state.error}</h4>):(<Button onClick={this.handleSubmit}>Add Plant!</Button>)}
                        </div>
                    )}
                </Form>
            </LgBox>
        )
    }
}

export default CreatePlant;