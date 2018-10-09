import React, { Component } from "react";
import './Profile.css';
import API from '../../utils';
import ProfHead from '../../containers/ProfHead';
import Nav from '../../containers/Nav';
import ProBody from '../../containers/ProBody';

const fileTypes = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg']

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            set: false,
            user: null,
            plants: null,
            display_plants: [],
            addingPlant: false,
            plant: '',
            modal: '',
            plantname: null,
            description: null,
        }
    }

    async componentWillMount() {
        this.getUser();
    }

    getUser() {
        console.log('profile');
        const { user } = this.props;
        console.log(user);
        this.setState({
            set: true,
            user: user,
            plants: user.plants,
            display_plants: user.plants
        })
    }

    addPlant = (plant) => {
        const plants = this.state.plants.unshift(plant);
        this.setState({
            plants: plants
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

    prepPlantForCreation = () => {
        API.Plant.createUserPlant(this.state.user.username, { name: 'Staged' })
            .then(result => (this.setState({
                prepedPlant: result.data._id
            }, console.log(this.state.prepedPlant))))
    }

    handlePostAPlantClick = () => {
        this.setState({
            addingPlant: true
        })
    }

    goHome = () => {
        this.setState({
            display_plants: this.state.user.plants
        })
    }

    deletePlant = (plantId) => {
        API.Plant.removeFromUser(plantId, this.state.user.username);
        const { user } = this.state;
        user.plants = user.plants.filter(plant => plant._id === plantId ? null : plant)
        console.log(user.plants);
        console.log(user);
        this.setState({
            user: user,
            display_plants: user.plants
        })
    }
    
    cancelAddingPlant = (filename) => {
        console.log(filename);
        if (filename) {
            API.Image.remove(filename)
                .then(result => console.log(result));
        }

        this.setState({
            addingPlant: false
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

    handlePlantClick = (e, plant) => {
        console.log(plant);
        this.setState({
            modal: 'active',
            plant: plant
        })
    }

    closeModal = () => {
        this.setState({
            modal: '',
            plant: ''
        })
    }


    addComment = plantId => {
        API.Comments.create(plantId, {
            comment: this.state.comment
        }).then(comment => {

            this.state.user.plants
                .filter(plant => plantId === plant._id).comments
                .push(comment);
        })
    }

    render() {
        return (
            <div>
                <div className='backDrop'></div>
                {!this.state.user ? null : (
                    <div>
                        <Nav id={this.state.user._id} addPlant={this.addPlant}/>
                        <div id='top'/>
                        <ProfHead picPro={this.state.user.profile_picture} picCov={this.state.user.cover_photo} id={this.state.user._id} />
                        
                        <ProBody plants={this.state.plants} userId={this.state.userid}/>
                    </div>)}
            </div>
        )
    };
};

export default Profile;