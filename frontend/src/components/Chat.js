import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import React, { useState } from 'react'
import axios from '../axios'
import '../styles/chat.css'

const Chat = ({messages}) => {
    const [input, setInput] = useState('')
    const sendMessage =  async (e)=>{
        e.preventDefault();
            await axios.post('/api/v1/messages/new',{
            message: input,
            name: 'Smart App',
            timestamp: "Just now",
            received: true
        })
        setInput('')

    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>

                </div>
                <div className="chat__headerRight">
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>
                    <IconButton >
                        <AttachFile />
                    </IconButton>
                    <IconButton >
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message =>(

                <p className={`chat__msg ${message.received &&  "chat__receiver"} `}>
                    <span className="chat__name">{message.name} </span>
                    {message.message}
                    <span className="chat__timestamp">
                       {message.timestamp}
                    </span>
                </p>

                ))}

                {/* <p className=" chat__msg chat__receiver">
                    <span className="chat__name">Lara</span>
                    Message goes here
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p> */}

            </div>
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>

                <form >
                    <input value={input} onChange={e=>setInput( e.target.value)}
                       placeholder="Type a message"

                    type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form> 
                <IconButton>
                    <MicIcon />
                </IconButton>

            </div>
            
        </div>
    )
}

export default Chat
