import LgBox from '../../wrappers/LgBox';
import { Form, FormGroup, Input, Button, FormText } from 'reactstrap';
import React, { Component } from "react";
import ReactCrop from 'react-image-crop';
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile, downloadBase64File } from '../../base64/base64';
import '../Crops/Crop1X1/Crop1X1.css';
import API from '../../utils';
import './CreatePlant.css';

const maxSize = 1000000;
const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg']

class CreatePlant extends Component {
    constructor(props) {
        super(props)
        this.fileUploaderRef = React.createRef()
        this.imagePreviewCanvasRef = React.createRef()
        this.state = {
            name: null,
            health: 'thriving',
            about: '',
            error: null,
            imgSrc: null,
            imgSrcExt: null,
            isCropped: false,
            crop: null
        }
    }

    componentDidMount() {
        console.log(this.props.aspect)
        this.setState({
            imgSrc: this.props.imgSrc,
            imgSrcExt: this.props.imgSrcExt,
            crop: this.props.crop
        })
    }

    clickFileUploader = () => {
        this.setState({
            imgSrc: null,
            crop: this.props.crop
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
        console.log(crop);
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

    handleDefaultClearing = () => {
        const canvas = this.imagePreviewCanvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.setState({
            imgSrc: null,
            imgSrcExt: null,
            isCropped: false,
            crop: null,
            lading: false
        })
    }

    handlePlantImg = (base64) => {

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

    handleSubmit = (event) => {
        if (this.state.name) {
            this.setState({
                loading: true
            })
            event.preventDefault()
            const { imgSrc, imgSrcExt, name, about, health } = this.state
            if (imgSrc) {
                const canvasRef = this.imagePreviewCanvasRef.current
                const imageData64 = canvasRef.toDataURL('image' + imgSrcExt);
                const myFileName = "Preview File" + imgSrcExt
                const myNewCroppedFile = base64StringtoFile(imageData64, myFileName)
                this.handleDefaultClearing();
                const fd = new FormData();
                fd.append('image', myNewCroppedFile);
                API.Image.create(fd)
                    .then(res => {
                        API.Plant.createUserPlant(this.props.id, {
                            name: name,
                            about: about,
                            health: health,
                            image: res.data
                        }).then(res => {
                            this.props.addPlant(res.data)
                            this.props.cancel();
                        });
                    })
            }
        } else {
            this.setState({
                error: 'A plant name is required.'
            })
        }

    }

    render() {
        const { crop, imgSrc, loading } = this.state
        return (
            <LgBox>
                {loading ? (<h2 className='text-center'>loading</h2>) : (
                    <div>
                        <div className='x' onClick={this.props.cancel}>x</div>
                        <input className='hidden-button' type='file' name='image' ref={fileInput => this.fileInput = fileInput} accept={fileTypes} multiple={false} onChange={this.handleImage} />
                        <div className='inner_box'>
                            {this.state.imgSrc ? (
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
                        </div>

                        <br /> <br />
                        <Form>
                            <FormGroup>
                                <Input type="text" name="name" id="input-plant" onChange={this.handleInputChange} placeholder="What's the name of you plant?" />
                            </FormGroup>
                            <br />
                            <FormGroup>
                                <FormText>Is your plant in need of help?</FormText>
                                <Input type="select" name="health" onChange={this.handleInputChange} id="select-health">
                                    <option value='thriving'>Nope</option>
                                    <option value='sick'>Yes please!</option>
                                </Input>
                            </FormGroup>
                            <FormText>Don't be afraid to include gardening tips or ask others for help!</FormText>
                            <FormGroup>
                                <Input type="textarea" name="about" id="input-about" onChange={this.handleInputChange} placeholder='What make your plant special to you?' />
                            </FormGroup>
                            <br />
                            {this.state.error ? <h4 className='imageWarning'>{this.state.error}</h4> : <Button onClick={this.handleSubmit}>Add Plant!</Button>}
                        </Form>
                    </div>
                )}
            </LgBox>
        )
    }
}

export default CreatePlant;