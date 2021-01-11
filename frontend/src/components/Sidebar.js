import { IconButton, Avatar } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import React from 'react'
import '../styles/sidebar.css'
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80" />
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                         <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>

                <div className="sidebar__headerLeft"></div>

            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>

                </div>
            </div>
            <div className="sidebar__chats">
               <SidebarChat />
               <SidebarChat />
               <SidebarChat />
            </div>
            
        </div>
    )
}

export default Sidebar
