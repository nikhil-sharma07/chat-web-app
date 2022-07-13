import React, {useEffect} from 'react'
import Top from '../../components/chat-window/top/index';
import Messages from '../../components/chat-window/messages/index';
import Bottom from '../../components/chat-window/bottom/index';
import { useParams } from 'react-router-dom';
import { Loader } from 'rsuite';
import { useRooms } from '../../context/room.context';
import { CurrentRoomProvider } from '../../context/current-room.context';
import { transformToArr } from '../../misc/helpers';
import { auth } from '../../misc/firebase';


const Chat = () => {

  const {chatId} = useParams();

  const rooms = useRooms();
  
  useEffect(() => {
    window.chatId = chatId;
  }, [chatId]);

  if(!rooms){
    return <Loader center vertical size="md" content="Loading" speed="slow" />
  }

  const currentRoom = rooms.find(room => room.id === chatId);
  if(!currentRoom){
    return <h6 className='text-center mt-page'>Chat {chatId} not found..</h6>
  }

  const {name, description} = currentRoom;


  const admins = transformToArr(currentRoom.admins);
  const isAdmin = admins.includes(auth.currentUser.uid);


  const currentRoomData = {
    name, 
    description,
    admins,
    isAdmin
  };


  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className='chat-top'>
        <Top />
      </div>

      <div  className='chat-middle'>
        <Messages />
      </div>

      <div className='chat-bottom'>
        <Bottom />
      </div>
    </CurrentRoomProvider>
  )
}

export default Chat