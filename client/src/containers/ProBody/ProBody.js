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
            plants: null,
            displayPlants: null
        }
    }

    componentWillMount() {
        this.setState({
           userId: this.props.userId,
           plants: this.props.plants,
           displayPlants: this.props.plants
        })
    }

    


    render() {
        const {displayPlants, userId} = this.state;
        return (
            <div>
                {displayPlants ? (
                    <div className='body'>
                        {displayPlants.map(plant => {
                            return <PlantCard plant={plant} userId={userId}/>
                        })}
                    </div>
                ):null}
            </div>
        )
    }
}

export default ProfHead;