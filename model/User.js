const {Schema, model} = require('mongoose')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

UserSchema.methods.generateAuthToken = async function(){
    let token = await jwt.sign({id: this._id.toString()}, SECRET_KEY)
    this.tokens = await this.tokens.concat({token})
    await this.save()
    return token
}

const User = new model('user', UserSchema)

module.exports = User;