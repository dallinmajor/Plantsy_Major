const router = require('express').Router();
const userRoutes = require('./user');
const plantRoutes = require('./plant');
const commentsRoutes = require('./comment');
const imageRoutes = require('./image');

router.use('/user', userRoutes);
router.use('/plant', plantRoutes);
router.use('/comments', commentsRoutes);
router.use('/image', imageRoutes);

module.exports = router;