import React, { Component } from "react";
import './Nav.css';
import CreatePlant from '../CreatePlant';
import {extractImageFileExtensionFromBase64} from '../../base64/base64';
import { delete_cookie } from 'sfcookies';

const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg'];
const maxSize = 10000000;

class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgSrc: null,
            imgSrcExt: null,
            isCreatingPlant: null
        }
    }

    logOut = () => {
        delete_cookie('User');
        window.location.assign('/');
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

    cancelCreatePlant=()=>{
        this.setState({
            isCreatingPlant: false
        })
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
                        isCreatingPlant: true,
                        imgSrc: reader.result,
                        imgSrcExt: extractImageFileExtensionFromBase64(reader.result)
                    })
                }, false)
                reader.readAsDataURL(image);
            }
        }
    }

    addPlant = (plant) => {
        this.props.addPlant(plant);
    }
        render() {
            return (
                <div>
                    <div className="myNav">
                        <div className='plantsy-nav-color'>
                            <div className='nav-buffer'></div>
                            <div className="title">Plantsy  </div>
                            <div href='/create' className='plantsy-nav-link'>Home</div>
                            <div href='/create' className='plantsy-nav-link'>Feed</div>
                            <div className="dropdown plantsy-nav-link">
                                <span>Profile</span>
                                <div className="dropdown-content">
                                    <p className='dropdown-links' onClick={this.clickFileUploader}>Add Plant</p>
                                    <p className='dropdown-links' onClick={this.logOut}>Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input className='hidden-button' type='file' name='image' ref={fileInput => this.fileInput = fileInput} accept={fileTypes} multiple={false} onChange={this.handleImage} />
                    {this.state.isCreatingPlant ? (
                        <CreatePlant imgSrc={this.state.imgSrc} imgSrcExt={this.state.imgSrcExt} id={this.props.id} addPlant={this.props.addPlant} crop={{ x: 0, y: 0, width: 300, aspect: 1}} cancel={this.cancelCreatePlant}/>
                    ):null}
                </div>
            )
        };
    };

    export default Nav;