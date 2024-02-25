const express = require('express')
const User = require('../model/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')

router.get('/', async (req, res) => {
    try{
        let response = await User.find()
        console.log(response)
        res.status(200).json(response)
    }
    catch(err){
        res.status(404).json(err)
    }
})

router.post('/login', [
    body('username').isLength({ min: 3 }).withMessage('Name characters should be between 3-20')
], async (req, res) => {

    try {
        let errors = await validationResult(req)
        let { username } = await req.body;

        let user = await User.findOne({username})

        if (!errors.isEmpty()) {
            console.log({message: errors.array()[0].msg})
            return res.status(400).json({message: errors.array()[0].msg})
        }

        if(user){
            console.log({message: 'User already exist'})
            return res.status(400).json({message: 'User already exist'})
        }

        if(username.includes(' ')){
            console.log({message: 'Please Use _ instead of empty spaces'})
            return res.status(400).json({message: 'Please Use _ instead of empty spaces'})
        }

        let resposne = await User.create({ username })
        let token = await resposne.generateAuthToken();

        console.log(token)
        return res.status(200).json({ token, _id: resposne._id })
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ message: err })
    }


})

module.exports = router