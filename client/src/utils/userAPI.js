import axios from 'axios'

export default {

    create: (user) => {
        return axios.post('/api/user/register', user)
            .catch(err => console.log(err));
    },

    find: (id) => {
        return axios.get('/api/user/' + id)
            .catch(err => console.log(err));
    },

    update: (id, updates) => {
        return axios.put('/api/user/' + id, updates)
            .catch(err => console.log(err));
    },

    remove: (id) => {
        return axios.delete('/api/user/' + id)
            .catch(err => console.log(err));
    },

    userValidation: (username, password) => {
        return axios.post('/api/user', {
            username: username,
            password: password
        })
    }
};