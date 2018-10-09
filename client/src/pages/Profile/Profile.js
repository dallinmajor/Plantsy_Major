import React, { Component } from "react";
import './Profile.css';
import API from '../../utils';
import ProfHead from '../../containers/ProfHead';
import Nav from '../../containers/Nav';
import ProBody from '../../containers/ProBody';
import './Profile.css';

const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg']

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            set: false,
            user: null,
            plants: null,
        }
    }

    async componentWillMount() {
        this.getUser();
    }

    getUser() {
        const { user } = this.props;
        console.log(user);
        this.setState({
            set: true,
            user: user,
            plants: user.plants,
        })
    }

    addPlant = (plant) => {
        let plants = this.state.plants;
        plants.push(plant);
        this.setState({
            plants: plants,
        });
    }

    filterPlants = (health) => {
        const { user } = this.state;
        if (!user.plants[0]) {
            return 'No Plants..'
        } else {
            const filted = user.plants.filter(plant => health.includes(plant.health) ? plant : null)
            this.setState({
                display_plants: filted
            })
        }
    }

    goHome = () => {
        this.setState({
            display_plants: this.state.user.plants
        })
    }



    changePlantHealth = event => {
        API.Plant.update(this.state.plant, {
            health: event.value
        })
    }

    changeDisplayTabs = tab => {
        const { plants } = this.state.user

        this.setState({
            display_plants: plants.filter(plant => plant.health === tab)
        });
    }



    render() {
        return (
            <div>
                <div className='backDrop'></div>
                {!this.state.user ? null : (
                    <div>
                        <Nav id={this.state.user._id} addPlant={this.addPlant} />
                        <ProfHead picPro={this.state.user.profile_picture} picCov={this.state.user.cover_photo} id={this.state.user._id} />
                        <ProBody plants={this.state.plants} userId={this.state.user._id} userName={this.state.user.fullname} deletePlant={this.deletePlant} userPro={this.state.user.profile_picture} />
                    </div>)}
                    <div className='bottom-buffer'/>
            </div>
        )
    };
};

export default Profile;
