require('dotenv').config()
const express = require('express')
const app = express();
const connectDB = require('./db/conn')
const cors = require('cors')

const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME

connectDB().then(()=>{
    console.log('Connecting...')
}).catch((err)=>{
    console.log(err)
})

app.get('/', (req, res)=>{
    res.status(200).send('Starts')
})


app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/user'))
app.use('/api/messages', require('./routes/messages'))

app.listen(port, hostname, ()=>{
    console.log(`http://${hostname}:${port}`)
})