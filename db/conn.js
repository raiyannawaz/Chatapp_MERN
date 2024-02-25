const {connect} = require('mongoose')

const connectDB = () =>{
    return connect(process.env.MONGOURL)
}

module.exports = connectDB