const {Schema, model} = require('mongoose')

const MessageSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Message = new model('Message', MessageSchema)

module.exports = Message;