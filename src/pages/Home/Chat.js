import React from 'react'
import Top from '../../components/chat-window/top';
import Messages from '../../components/chat-window/messages';
import Bottom from '../../components/chat-window/bottom';
import { useParams } from 'react-router-dom';
import { Loader } from 'rsuite';
import { useRooms } from '../../context/room.context';


const Chat = () => {

  const {chatId} = useParams();
  const rooms = useRooms();

  if(!rooms){
    return <Loader center vertical size="md" content="Loading" speed="slow" />
  }

  const currentRoom = rooms.find(room => room.id === chatId);
  if(!currentRoom){
    return <h6 className='text-center mt-page'>Chat {chatId} not found..</h6>
  }

  return (
    <div>
      <div className='chat-top'>
        <Top />
      </div>
      <div  className='chat-middle'>
        <Messages />
      </div>

      <div className='chat-bottom'>
        <Bottom />
      </div>
    </div>
  )
}

export default Chat