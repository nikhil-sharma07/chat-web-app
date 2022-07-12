import React from 'react'
import {Drawer, Button, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInputs from './EditableInputs';
import ProviderBlock from './ProviderBlock';
import AvatarUploadButton from './AvatarUploadButton';
import { getUserUpdates } from '../../misc/helpers';

const Dashboard = ({onSignOut}) => {
  const {profile} = useProfile();

  const onSave = async (newData) => {
    try{
      const updates = await getUserUpdates(profile.uid, 'name', newData, database);
      await database.ref().update(updates);
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
      <ProviderBlock />
      <Divider />
      <EditableInputs initialValue = {profile.name}
        name="nickname"
        onSave={onSave}
        label={<h6 className='mb-2'>Nickname</h6>}
      />
      <AvatarUploadButton />
    </Drawer.Body>
    
    <Drawer.Footer>
      <Button block color="red" onClick={onSignOut}>
        Sign Out
      </Button>
    </Drawer.Footer>
    
    </>
  );
};

export default Dashboard