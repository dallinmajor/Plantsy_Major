import axios from 'axios'

export default {

    create: (user) => {
        return axios.post('/api/user/register', user)
            .catch(err => console.log(err));
    },

    findByUsername: (username) => {
        return axios.get('api/user/' + username)
            .catch(err => console.log(err));
    },

    update: (username, updates) => {
        return axios.put('api/user/' + username, updates)
            .catch(err => console.log(err));
    },

    remove: (username) => {
        return axios.delete('api/user/' + username)
            .catch(err => console.log(err));
    },

    userValidation: (username, password) => {
        return axios.post('api/user', {
            username: username,
            password: password
        })
    }
};