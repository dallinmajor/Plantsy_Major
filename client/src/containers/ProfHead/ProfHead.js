import React, { Component } from "react";
import EditPhoto from '../EditPhoto';
import './ProfHead.css';
import API from '../../utils';
import { extractImageFileExtensionFromBase64 } from '../../base64/base64';

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
            editingPro: false,
            editingCov: false,
            edit: null
        }
    }

    componentWillMount() {
        this.setState({
            picPro: this.props.picPro,
            picCov: this.props.picCov,
            id: this.props.id
        })
    }

    clickFileUploaderPro = () => {
        this.setState({
            edit: 'Pro'
        })
        this.fileInput.click();
    }

    clickFileUploaderCov = () => {
        this.setState({
            edit: 'Cov'
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

    editProPic = (base64) => {
        this.setState({
            editingCov: false,
            editingPro: false
        })
        const fd = new FormData();
        fd.append('image', base64);
        API.Image.updatePro(this.state.id, fd)
            .then(res => this.setState({
                picPro: res.data
            }))
    }

    editCovPic = (base64) => {
        this.setState({
            editingCov: false,
            editingPro: false
        })

        const fd = new FormData();
        fd.append('image', base64);
        API.Image.updateCov(this.state.id, fd)
            .then(res => this.setState({
                picCov: res.data
            }))
    }

    exitEdit = () => {
        this.setState({
            editingCov: false,
            editingPro: false
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
                    if (this.state.edit === 'Pro') {
                        this.setState({
                            imgSrc: reader.result,
                            imgSrcExt: extractImageFileExtensionFromBase64(reader.result),
                            editingPro: true
                        })
                    } else if (this.state.edit === 'Cov') {
                        this.setState({
                            imgSrc: reader.result,
                            imgSrcExt: extractImageFileExtensionFromBase64(reader.result),
                            editingCov: true
                        })
                    }
                }, false)
                reader.readAsDataURL(image);
            }
        }
    }



    render() {
        const { imgSrc, imgSrcExt, picPro, picCov, editingCov, editingPro } = this.state
        return (
            <div>
                <div className='prof-head-buffer'/>
                <div className='profile-head'>
                    <div onClick={this.clickFileUploaderCov} className='cover-pic'>
                        {picCov ? <img className='cover-picture' src={'/api/image/' + picCov} alt='pic' /> : <div className='empty-cov' />}
                    </div>
                    <div onClick={this.clickFileUploaderPro} className='profile-pic '>
                        {picPro ? <img className='profile-picture' src={'/api/image/' + picPro} alt='pic' /> : <div className='empty-pro' />}
                    </div>
                </div>
                {editingPro ? <EditPhoto imgSrc={imgSrc} imgSrcExt={imgSrcExt} editPic={this.editProPic} crop={{ x: 0, y: 0, width: 300, aspect: 1 }} cancel={this.exitEdit} /> : null}
                {editingCov ? <EditPhoto imgSrc={imgSrc} imgSrcExt={imgSrcExt} editPic={this.editCovPic} crop={{ x: 0, y: 0, width: 300, aspect: 100/33 }} cancel={this.exitEdit} /> : null}
                <input className='hidden-button' type='file' name='image' ref={fileInput => this.fileInput = fileInput} accept={fileTypes} multiple={false} onChange={this.handleImage} />
            </div>
        )
    }
}

export default ProfHead;