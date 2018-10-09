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
            comments: null,
            comment: null
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
        const { plant, index, userId } = this.props;
        this.setState({
            plant: plant,
            index: index,
            userId: userId,
            comments: plant.comments
        })
    }

    plantComment () {
        API.Comments.

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
        const { plant, isDisplaying } = this.state
        return (
            <div className='image-border'>
                {plant ? (
                    <AnchorLink href='#top'>

                        <img className='image-thumb' src={'/api/image/' + plant.image} alt={plant.name} onClick={this.display} />
                        <div className={'filter ' + plant.health}></div>

                        {isDisplaying ? (
                            <LgBox>
                                <div className='hoist'>
                                    <h1 className='cancel-button' onClick={this.cancel}>x</h1>
                                </div>
                                <div className='image-card'>
                                    <img src={'/api/image/' + plant.image} className='card-img' alt={plant.name} />
                                </div>
                                <p>{plant.about}</p>
                                <h1 className='text-center plant-name'>{plant.name}</h1>
                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Input type='text' name='comment' onChange={this.handleOnChange} />
                                    </FormGroup>
                                    <Button onClick={this.plantComment}>Comment</Button>
                                </Form>
                            </LgBox>
                        ) : null}
                    </AnchorLink>
                ) : null}
            </div>
        )
    }
}

export default PlantCard;