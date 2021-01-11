import Messages from '../models/dbMessages.js'

export const  postMessage = (req, res) =>{
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data)=>{
        if(err) {
           res.status(500).send(err)
        }else {
            res.status(201).send(data)
        }
    })

}

export const getMessages =  (req, res) => {
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else {
            res.status(200).send(data)
        }
    })


}
 