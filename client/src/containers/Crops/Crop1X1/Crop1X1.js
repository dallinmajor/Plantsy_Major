import React, { Component } from "react";
import ReactCrop from 'react-image-crop';
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile, downloadBase64File } from '../../../base64/base64';
import './Crop1X1.css';

const maxSize = 1000000;
const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg']

class Crop1X1 extends Component {
    constructor(props) {
        super(props)
        this.fileUploaderRef = React.createRef()
        this.imagePreviewCanvasRef = React.createRef()
        this.state = {
            imgSrc: null,
            imgSrcExt: null,
            isCropped: false,
            crop: null
        }
    }

    componentDidMount() {
        this.setState({
            imgSrc: this.props.imgSrc,
            imgSrcExt: this.props.imgSrcExt,
            crop: this.props.aspect
        })
    }

    clickFileUploader = () => {
        this.setState({
            imgSrc: null
        })
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
                    this.setState({
                        imgSrc: reader.result,
                        imgSrcExt: extractImageFileExtensionFromBase64(reader.result)
                    })
                }, false)
                reader.readAsDataURL(image);
            }
        }
    }

    handleOnCropChange = (crop) => {
        this.setState({ crop: crop });
    }

    handleOnCropComplete = (crop, pixelCrop) => {
        // console.log(crop, pixelCrop);
        const canvasRef = this.imagePreviewCanvasRef.current
        const { imgSrc } = this.state
        image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
        this.setState({
            isCropped: true
        })
    }

    sendBase64 = (event) => {
        event.preventDefault()
        const { imgSrc } = this.state
        const { imgSrcExt } = this.state
        if (imgSrc) {
            const canvasRef = this.imagePreviewCanvasRef.current
            const imageData64 = canvasRef.toDataURL('image' + imgSrcExt);
            const myFileName = "Preview File" + imgSrcExt
            const myNewCroppedFile = base64StringtoFile(imageData64, myFileName)
            this.handleDefaultClearing();
            this.props.sendBase64(myNewCroppedFile);
        }
    }

    handleDefaultClearing = () => {
        const canvas = this.imagePreviewCanvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.setState({
            imgSrc: null,
            imgSrcExt: null,
            isCropped: false,
            crop: null
        })
    }
    render() {
        const { imgSrc, crop } = this.state
        return (
            <div>
                <input className='hidden-button' type='file' name='image' ref={fileInput => this.fileInput = fileInput} accept={fileTypes} multiple={false} onChange={this.handleImage} />
                <div className='inner_box'>
                    {this.state.imgSrc? (
                        <div>
                            <div className="box-picture">
                                <canvas ref={this.imagePreviewCanvasRef} className='imageCanvas'></canvas>
                                <div className="box-center">
                                    <ReactCrop
                                        src={imgSrc}
                                        crop={crop}
                                        onChange={this.handleOnCropChange}
                                        onImageLoaded={this.handleImageLoaded}
                                        onComplete={this.handleOnCropComplete}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <h6 onClick={this.clickFileUploader} className='text-center plantsy'>Change Photo?</h6>
                    <div className='crop-button-box'>
                        <button className='button-crop pull-right' onClick={this.sendBase64}>CROP</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default Crop1X1;