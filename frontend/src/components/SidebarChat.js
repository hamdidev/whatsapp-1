import { Avatar } from '@material-ui/core';
import React from 'react'
import '../styles/sidebarChat.css'
const SidebarChat = () => {
    return (
        <div className="sidebarChat">
            <Avatar />
            <div className="sidebarChat__info">
                <h3>Room Name</h3>
                <p>This is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChat
