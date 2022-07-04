import React, { Profiler } from 'react'
import {Drawer, Button, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInputs from './EditableInputs';

const Dashboard = ({onSignOut}) => {
  const {profile} = useProfile();

  const onSave = async (newData) => {
    const userNicknameRef = database.ref(`/profiles/${profile.uid}`).child('name');
    try{
      await userNicknameRef.set(newData);
        Alert.success('Nickname Updated!!', 4000)
    }catch(err){
      Alert.error(err.message, 4000);
    }
  }

  return (
    <>
    <Drawer.Header>
      <Drawer.Title>
        DASHBOARD
      </Drawer.Title>
    </Drawer.Header>

    <Drawer.Body>
      <h3>Hey, {profile.name}</h3>
      <Divider />
      <EditableInputs initialValue = {profile.name}
        name="nickname"
        onSave={onSave}
        label={<h6 className='mb-2'>Nickname</h6>}
      />
    </Drawer.Body>
    
    <Drawer.Footer>
      <Button block color="red" onClick={onSignOut}>
        Sign Out
      </Button>
    </Drawer.Footer>
    
    </>
  )
}

export default Dashboard