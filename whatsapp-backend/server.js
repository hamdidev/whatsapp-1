import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'
import dotenv  from "dotenv"
dotenv.config();
import messageRoutes from './routes/messageRoutes.js'


// App config
const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT || 5000

// Middleaware
app.use(cors())

app.use(express.json())


// api routes
app.use('/api/v1/messages/new', messageRoutes)
app.use('/api/v1/messages/sync', messageRoutes)


// Pusher Config
const pusher = new Pusher({
    appId: "1136259",
    key: "dba6cef82ad01b79ebb3",
    secret: "2697b93958efb39f81be",
    cluster: "eu",
    useTLS: true
});


const db = mongoose.connection

db.once('open', ()=>{
    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()
    changeStream.on('change', (change)=>{
    if(change.operationType === 'insert'){
        const messageDetails = change.fullDocument;
        pusher .trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            }
        )
    }else {
        console.log('Error triggering Pusher')
    }
    })
})


// db config
const URI = process.env.MONGO_URI

mongoose
.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => app.listen(PORT, ()=> console.log(`server running on port ${PORT} and DB Connected`)));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});
mongoose.set('useFindAndModify', false);
