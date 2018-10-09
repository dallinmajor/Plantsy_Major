import React from 'react';
import { Component } from 'react';
import LgBox from '../../wrappers/LgBox';
import { Input, Label, Form, FormGroup, Button } from 'reactstrap';
import API from '../../utils';
import './PlantCard.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';


class PlantCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plant: null,
            index: null,
            userId: null,
            isDisplaying: false,
            userPro: null,
            userName: null,
            comments: null,
            comment: null,
            deleteComment: false,
            deletePlant: true
        }
    }

    handleOnChange = event => {
        const { name, value } = event.target;
        console.log(value);
        this.setState({
            [name]: value
        });
    }

    componentWillMount() {
        const { plant, index, userId, userPro, userName, deleteComment } = this.props;
        this.setState({
            plant: plant,
            index: index,
            userId: userId,
            userPro: userPro,
            userName: userName,
            comments: plant.comments,
            isLoadingComment: false,
        })

        deleteComment ? this.setState({
            deleteComment: true,
            deletePlant: true
        }) : null;
    }

    plantComment = () => {
        const { comments, comment, userName, userPro } = this.state;

        this.setState({
            isLoadingComment: true
        })
        API.Comments.create(this.state.plant._id, {
            comment: comment,
            userName: userName,
            userImg: userPro
        }).then(res => {
            console.log(res.data)
            comments.push(res.data);
            this.setState({
                comments: comments,
                isLoadingComment: false
            })
        });
    }

    deleteComment = (id, plantId) => {
        let comments = this.state.comments.filter(comment => comment._id === id ? null : comment);
        this.setState({
            comments: comments
        });
        this.props.deleteComment(id, plantId);
    }

    cancel = () => {
        this.setState({
            isDisplaying: false
        })
    }

    display = () => {
        this.setState({
            isDisplaying: true
        })
    }
    render() {
        const { plant, isDisplaying, isLoadingComment, deletePlant } = this.state
        return (
            <div className='image-border'>
                {plant ? (
                    <div>
                        <img className='image-thumb' src={'/api/image/' + plant.image} alt={plant.name} onClick={this.display} />
                        <div className={'filter ' + plant.health}></div>
                        {isDisplaying ? (
                            <LgBox>
                                <div className='hoist'>
                                    <h1 className='cancel-button' onClick={this.cancel}>x</h1>
                                </div>
                                <div className='image-card'>
                                    <img src={'/api/image/' + plant.image} id={plant.health} className='card-img' alt={plant.name} />
                                </div>
                                <p>{plant.about}</p>
                                {deletePlant ? (
                                    <div className="dropdown text-center plant-name">
                                        <span>{plant.name}</span>
                                        <div className="dropdown-content">
                                            <p onClick={() => { this.cancel(); this.props.deletePlant(plant._id); }}>delete</p>
                                        </div>
                                    </div>
                                ) : (<h1 className='text-center plant-name'>{plant.name}</h1>)}
                                <p className='plant-about'>{plant.description}</p>
                                <form>
                                    <input type='text' className='comment-input' name='comment' onChange={this.handleOnChange} />
                                    <button className='comment-btn' onClick={this.plantComment}>Comment</button>
                                </form>
                                <br />
                                {this.state.comments.map(comment => (
                                    <div>
                                        <div>
                                            <img className='comment-thumb' src={'/api/image/' + comment.userImg} />
                                            <div className='comment-username' href={'/friend/' + comment.userName}>{comment.userName}</div>
                                            <div onClick={() => this.deleteComment(comment._id, plant._id)}>delete</div>
                                        </div>
                                        <p>{comment.comment}</p>
                                    </div>
                                ))}
                                {isLoadingComment ? (<h2 className='text-center'>loading...</h2>) : null}
                            </LgBox>
                        ) : null}
                    </div>
                ) : null}
            </div>
        )
    }
}

export default PlantCard;