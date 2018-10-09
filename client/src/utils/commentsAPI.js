import axios from 'axios'

//GET ALL COMMENTS
    //In your brower address bar thing put
        //localhost:3001/api/comments/all
//OUTPUT JSON DATA

export default {
    //Input plantId of the plant to which the comment will belong
        //and the comment object
            //Example
                //comment: 'This is a comment'
    //Output comment data
    create: (plantId, comment) => {
        return axios.post('/api/comments/' + plantId, comment)
            .catch(err => console(err));
    },

    //Input commentId
        //Output comment data
    findById: (id) => {
        return axios.get('api/comments/' + id)
            .catch(err => console.log(err));
    },

    //Input commentId and object of updated properties
        //Example
            //comment: 'This is an edited comment'
    //When it was updated
    update: (id) => {
        return axios.put('api/comments/' + id)
            .catch(err => console.log(err));
    },

    //Input commentId and plantId
        //Output 'deleted!'
    removeFromUser: (id, plantId) => {
        return axios.delete(`api/comments/${id}/${plantId}`)
            .catch(err => console.log(err));
    }
};