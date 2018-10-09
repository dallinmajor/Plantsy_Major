import React, { Component } from "react";
import API from '../../utils';
import PlantCard from '../PlantCard';
import './ProBody.css';

const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg']
const maxSize = 10000000;

class ProfHead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: null,
            userName: null,
            userPro: null,
            plants: null,
            displayPlants: null,
            thriving: null,
            sick: null,
        }
    }

    componentWillMount() {
        let thriving = this.props.plants.filter(plant => plant.health === 'thriving' ? plant : null)
        let sick = this.props.plants.filter(plant => plant.health === 'sick' ? plant : null)

        this.setState({
            userPro: this.props.userPro,
            userName: this.props.userName,
            userId: this.props.userId,
            plants: this.props.plants,
            thriving: thriving,
            sick: sick,
            display: 'all'
        })
    }


    deletePlant = (plantId) => {

        const { plants, userId } = this.state

        console.log(plants)
        let newdisplay = plants.filter(plant => plant._id === plantId ? null : plant);
        console.log(newdisplay);
        this.setState({
            plants: newdisplay,
            displayPlants: newdisplay
        })

        API.Plant.removeFromUser(plantId, userId)
            .then(res => console.log(res));
    }

    deleteComment = (id, plantId) => {
        API.Comments.removeFromPlant(id, plantId)
            .then(res => console.log(res));
    }

    filterPlants = (health) => {
        const { plants } = this.state;
        if (!plants[0]) {
            return 'No Plants..'
        } else {
            this.setState({
                display: health
            })
        }
    }

    deleteComment(plantId, commentId) {
        API.Comments.removeFromPlant(plantId, commentId)
            .then(res => console.log(res));
    }

    



    render() {
        const { userId, plants, userName, userPro, sick, thriving, display } = this.state;
        return (
            <div>
                {display ? (
                    <div className='body'>
                        <div className='health-bar-box'>
                            <div className='health-bar-justify'>
                                <div className='text-center tab' onClick={() => this.filterPlants('thriving')}>Thriving</div>
                                <div className='text-center tab' onClick={() => this.filterPlants('all')}>All</div>
                                <div className='text-center tab' onClick={() => this.filterPlants('sick')}>Sick</div>
                            </div>
                        </div>
                        <br/>
                        <div id='top' />
                        {display === 'all' ? (
                            plants.map(plant => {
                                console.log(plant);
                                return <PlantCard plant={plant} userId={userId} userName={userName} deleteComment={this.deleteComment} deletePlant={this.deletePlant} userPro={userPro} />
                            })
                        ):null}
                        {display === 'thriving' ? (
                            thriving.map(plant => {
                                console.log(plant);
                                return <PlantCard plant={plant} userId={userId} userName={userName} deleteComment={this.deleteComment} deletePlant={this.deletePlant} userPro={userPro} />
                            })
                        ):null}
                        {display === 'sick' ? (
                            sick.map(plant => {
                                console.log(plant);
                                return <PlantCard plant={plant} userId={userId} userName={userName} deleteComment={this.deleteComment} deletePlant={this.deletePlant} userPro={userPro} />
                            })
                        ):null}

                    </div>
                ) : null}
            </div>
        )
    }
}

export default ProfHead;