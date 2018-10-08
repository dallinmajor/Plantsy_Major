import React, { Component } from "react";
import EditPhoto from '../EditPhoto';
import './ProfHead.css';
import API from '../../utils';
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile, downloadBase64File } from '../../base64/base64';

const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg']
const maxSize = 10000000;

class ProfHead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            picPro: null,
            picCov: null,
            imgSrc: null,
            imgSrcExt: null,
            editFunc: null,
            editAspect: null,
            isEditting: false
        }
    }

    componentWillMount() {
        this.setState({
            picPro: this.props.picPro,
            picCov: this.props.picCov,
            id: this.props.id
        })
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
    
    editProPic = (base64) => {
        this.setState({
            isEditting: false,
        })
        const fd = new FormData();
        fd.append('image', base64);
        API.Image.updatePro(this.state.id, fd)
            .then(res => window.location.reload())
    }

    exitEdit = () => {
        this.setState({
            isEditting: false
        })
    }

    handleImage = (e) => {
        console.log('image selected!')
        e.preventDefault();
        const files = e.target.files;
        if (files && files.length > 0) {
            const isVerified = this.verifyImage(files);
            if (isVerified) {
                const image = files[0];
                const reader = new FileReader();
                reader.addEventListener("load", () => {
                    this.setState({
                        isEditting: true,
                        imgSrc: reader.result,
                        imgSrcExt: extractImageFileExtensionFromBase64(reader.result)
                    })
                }, false)
                reader.readAsDataURL(image);
            }
        }
    }



    render() {
        const { imgSrc, imgSrcExt, editFunc, editAspect, picPro, isEditting } = this.state
        return (
            <div>
                
                <div onClick={this.clickFileUploader} className='profile-upload'>
                {!this.state.picPro?null:<img className='profile-picture' src={'/api/image/' + picPro} alt='pic' />}
                </div>
                
                {isEditting?<EditPhoto imgSrc={imgSrc} imgSrcExt={imgSrcExt} editProPic={this.editProPic} edit={{ aspect: 1 / 1 }} exit={this.exitEdit} />:null}
                <input className='hidden-button' type='file' name='image' ref={fileInput => this.fileInput = fileInput} accept={fileTypes} multiple={false} onChange={this.handleImage} />
            </div>
        )
    }
}

export default ProfHead;