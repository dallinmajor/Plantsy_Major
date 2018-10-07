const router = require('express').Router();
const userRoutes = require('./user_routes');
const plantRoutes = require('./plant_routes');
const commentsRoutes = require('./comment_routes');
const imageRoutes = require('./image_routes');

router.use('/user', userRoutes);
router.use('/plant', plantRoutes);
router.use('/comments', commentsRoutes);
router.use('/image', imageRoutes);

module.exports = router;