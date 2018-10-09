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
            displayPlants: null
        }
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

    filterPlants = (health) => {
        const { plants } = this.state;
        if (!plants[0]) {
            return 'No Plants..'
        } else {
            const filted = plants.filter(plant => health.includes(plant.health) ? plant : null)
            this.setState({
                displayPlants: filted
            })
        }
    }

    deleteComment(plantId, commentId) {
        API.Comments.removeFromPlant(plantId, commentId)
            .then(res => console.log(res));
    }

    componentWillMount() {
        this.setState({
            userPro: this.props.userPro,
            userName: this.props.userName,
            userId: this.props.userId,
            plants: this.props.plants,
            displayPlants: this.props.plants
        })
    }




    render() {
        const { displayPlants, userId, userName, userPro } = this.state;
        return (
            <div>
                {displayPlants ? (
                    <div className='body'>
                        <div className='health-bar-box'>
                            <div className='health-bar-justify'>
                                <div className='text-center tab' onClick={() => this.filterPlants(['thriving'])}>Thriving</div>
                                <div className='text-center tab' onClick={() => this.filterPlants(['thriving', 'sick'])}>All</div>
                                <div className='text-center tab' onClick={() => this.filterPlants(['sick'])}>Sick</div>
                            </div>
                        </div>
                        <br/>
                        {displayPlants.map(plant => {
                            return <PlantCard plant={plant} userId={userId} userName={userName} deletePlant={this.deletePlant} userPro={userPro} />
                        })}
                    </div>
                ) : null}
            </div>
        )
    }
}

export default ProfHead;