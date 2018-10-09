import axios from 'axios'


export default {
    
    create: (file) => {
        return axios.post('/api/image/', file)
        .catch(err => console.log(err));
    },

    updatePro: (id, image) => {
        return axios.post('/api/image/picPro/' + id, image)
            .catch(err => console.log(err));
    },

    updateCov: (id, image) => {
        return axios.post('/api/image/picCov/' + id, image)
            .catch(err => console.log(err));
    },


    remove: (filename) => {
        return axios.delete('/api/image/' + filename)
            .catch(err => console.log(err));
    }
};