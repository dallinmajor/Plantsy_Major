const router = require("express").Router()
const plantController = require('../../controllers/plantController');



router.route('/:username')
    .post(plantController.create)

router.route('/all')
    .get(plantController.findAll);

// api/plant/:id
router.route("/:id")
    .get(plantController.findById)
    .put(plantController.update)
    .delete(plantController.remove);

router.route('/:plantId/:username')
    .delete(plantController.removePlantFromUser);


module.exports = router;