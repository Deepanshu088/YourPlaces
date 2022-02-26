const express = require('express');
const {check} = require('express-validator')
const placesControllers = require('../controllers/places-controllers');
const authCheck = require('../middlewares/auth-check');
const HttpError = require('../models/http-error');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId)

// router.use(authCheck);

router.post('/', authCheck,
                [  check('title').not().isEmpty(), 
                    check('description').isLength({ min : 5 }), 
                    check('address').not().isEmpty(),
                    check('image').not().isEmpty()
                ], 
                placesControllers.createPlace);

router.patch('/:pid', authCheck, [ check('title').not().isEmpty(), 
                        check('description').isLength({ min : 5 }), 
                        ], placesControllers.updatePlace)

router.delete('/:pid', authCheck, placesControllers.deletePlace)

module.exports = router;