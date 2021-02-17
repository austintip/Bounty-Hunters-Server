// dependencies
const DB = require('../models');
const ROUTER = require('express').Router();

//POST '/' - create one bounty
ROUTER.post('/', (req, res) => {
    DB.Bounty.create(req.body)
    .then(newBounty => {
        res.status(201).send(newBounty);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Internal Server Error' });
    })
});



//GET '/' - read all bounties
ROUTER.get('/', (req, res) => {
    DB.Bounty.find()
    .then(bounties => {
        res.status(200).send(bounties)
    })
    .catch(err => {
        res.status(500).send({ message: 'Error hit at READ ALL BOUNTIES'})
    })
})

//GET '/:id' - read one bounty
ROUTER.get('/:id', (req, res) => {
    DB.Bounty.findById(req.params.id)
    .then(bounty => {
        if (bounty) {
            res.send(bounty);
        }
        else {
            res.status(404).send({message: '404 - Bounty not found'})
        }
    })
    .catch(err => {
        res.status(503).send({ message: 'Service unavailable' })
    });
});


//PUT '/:id' - update one bounty
ROUTER.put('/:id', (req, res) => {
    DB.Bounty.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        { new: true}
    )
    .then(updatedBounty => {
        res.send(updatedBounty);
    })
    .catch(err => {
        console.log(err);
        res.status(503).send({ message: 'Server problems, who dis?'})
    });
});


//DELETE '/:id' - delete one bounty 


module.exports = ROUTER