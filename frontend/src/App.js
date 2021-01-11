import React, { useEffect, useState } from 'react'

import Pusher from 'pusher-js'
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import axios from './axios'
import './App.css';

function App() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    axios.get('/api/v1/messages/sync')
    .then(response => {
      setMessages(response.data)
    })

  }, [])

  useEffect(()=>{
    const pusher = new Pusher('dba6cef82ad01b79ebb3', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      setMessages([...messages, newMessage])
    });
    return ()=> {
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages])
  console.log(messages)
  return (
    <div className="app">
      <div className="app__body">

        <Sidebar />
        <Chat messages={messages} />
      </div>
      
    </div>
  );
}

export default App;
