import React, { Component } from "react";
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile, downloadBase64File } from '../../../base64/base64';
// import 'react-image-crop/dist/ReactCrop.css';
import './DragNDrop.css';
import API from '../../../utils/';

const maxSize = 1000000;
const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg']

class Crop1X1 extends Component {
    constructor(props) {
        super(props)
        this.imagePreviewCanvasRef = React.createRef()
        this.state = {
            imgSrc: null,
            imgSrcExt: null,
            isCropped: false,
            crop: {
                aspect: 1 / 1
            }
        }
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
            if(e.target.files && event.files.length > 0) {
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
        this.setState({
            imgSrc: files[0]
        })
    }

    handleImageLoaded = (image) => {
        console.log(image);
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

    handleAddImage = (event) => {
        event.preventDefault()
        const { imgSrc } = this.state
        const { imgSrcExt } = this.state
        if (imgSrc) {
            const canvasRef = this.imagePreviewCanvasRef.current
            const imageData64 = canvasRef.toDataURL('image' + imgSrcExt);
            const myFileName = "Preview File" + imgSrcExt
            const myNewCroppedFile = base64StringtoFile(imageData64, myFileName)
            const fd = new FormData();
            fd.append('image', myNewCroppedFile);
            API.Image.create(fd)
                .then(res => {
                    this.handleDefaultClearing();
                    this.props.setImageFileName(res)
                });

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
            crop: {
                aspect: 1 / 1
            }
        })
    }
    render() {
        const { imgSrc, crop } = this.state
        return (
            <div>
                <input type='file' name='image' accept={fileTypes} multiple={false} onChange={this.handleImage}/>
                <ReactCrop
                    src={imgSrc}
                    crop={crop}
                    onChange={this.handleOnCropChange}
                    onImageLoaded={this.handleImageLoaded}
                    onComplete={this.handleOnCropComplete}
                />
                <canvas ref={this.imagePreviewCanvasRef} className='imageCanvas'></canvas>
            </div>
        )
    }
}

export default Crop1X1;