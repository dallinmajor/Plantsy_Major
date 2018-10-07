import React, { Component } from "react";
import Crop1X1 from '../Crops/Crop1X1';
import LgBox from '../../wrappers/LgBox';
import './ProfHead.css';
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile, downloadBase64File } from '../../base64/base64';

const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg']
const maxSize = 10000000;

class ProfHead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgSrc: null,
            imgSrcExt: null
        }
    }

    clickFileUploader = () => {
        this.fileInput.click();
    }

    verifyImage = (files) => {
        if (files && files.length > 0) {
            const currentfile = files[0]
            const currentFileType = currentfile.type
            const currentFileSize = currentfile.size
            if (currentFileSize > maxSize) {
                alert('This file is not allowed. ' + currentFileSize + ' bytes is too large!')
                return false;
            }

            if (!fileTypes.includes(currentFileType)) {
                alert('This file is not an image. Only Images are allowed')
                return false;
            }

            return true;
        }
    }

    handleImage = (e) => {
        e.preventDefault();
        const files = e.target.files;
        if (files && files.length > 0) {
            const isVerified = this.verifyImage(files);
            if (isVerified) {
                const image = files[0];
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    console.log(reader.result)
                    this.setState({
                        imgSrc: reader.result,
                        imgSrcExt: extractImageFileExtensionFromBase64(reader.result)
                    })
                }, false)
                reader.readAsDataURL(image);
            }
        }
    }


    render() {
        const { imgSrc, imgSrcExt } = this.state
        return (
            <div>
                <button onClick={this.clickFileUploader}>click</button>
                <br /><br />
                <input className='hidden-button' type='file' name='image' ref={fileInput => this.fileInput = fileInput} accept={fileTypes} multiple={false} onChange={this.handleImage} />
                {!imgSrc ? null : (
                    <LgBox>
                        <Crop1X1
                            src={imgSrc}
                        />
                    </LgBox>
                )}
            </div>
        )
    }
}

export default ProfHead;