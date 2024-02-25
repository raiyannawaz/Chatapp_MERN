const express = require('express')
const router = express.Router()
const Message = require('../model/Message')
const fetchusers = require('../middleware/fetchusers')
const User = require('../model/User')

router.get('/', fetchusers, async  (req, res)=>{
    try{
        let response = await Message.find();
        console.log(response)
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(404).json({message: err})
    }
})

router.post('/message', fetchusers, async (req, res)=>{

    let {message} = await req.body;

    try{
        
        let user = await User.findOne({_id: req.id})

        let response = await Message.create({
            userId: user._id, name: user.username, message
        });

        console.log(user)
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(404).json({message: err})
    }
})

module.exports = router;