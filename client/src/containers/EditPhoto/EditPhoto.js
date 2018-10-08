import React, { Component } from "react";
import LgBox from '../../wrappers/LgBox';
import Crop1X1 from '../../containers/Crops/Crop1X1';
import API from '../../utils';

class EditPhoto extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {

        return (
            <LgBox>
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