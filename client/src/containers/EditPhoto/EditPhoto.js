import React, { Component } from "react";
import LgBox from '../../wrappers/LgBox';
import Crop1X1 from '../../containers/Crops/Crop1X1';
import { Form, Col, FormGroup, Label, Input, Button, Container, FormFeedback, FormText } from 'reactstrap';
import './EditPhoto.css';

class EditPhoto extends Component {
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
                    aspect={this.props.aspect}
                    sendBase64={this.props.editProPic}
                />
            </LgBox>
        )
    }
}

export default EditPhoto;