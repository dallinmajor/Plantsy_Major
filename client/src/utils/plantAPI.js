import axios from 'axios';

export default {

    createUserPlant: (id, plant) => {
        return axios.post('/api/plant/' + id, plant)
            .catch(err => console(err));
    },

    findById: (id) => {
        return axios.get('api/plant/' + id)
            .catch(err => console.log(err));
    },

    update: (id, update) => {
        return axios.put('api/plant/' + id, update)
            .catch(err => console.log(err));
    },

    removeFromUser: (id, username) => {
        return axios.delete(`api/plant/${id}/${username}`)
            .catch(err => console.log(err));
    }
};