import React, { useCallback, useState, useRef } from 'react'
import { Button, Icon, Modal, Form, FormGroup, ControlLabel, FormControl, Schema, Alert } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks'
import firebase from 'firebase/app';
import { database, auth } from '../../misc/firebase';

const {StringType} = Schema.Types;

const model = Schema.Model({
    name: StringType().isRequired('Chat name is required'),
    description: StringType().isRequired('Description is required')
})

const INITIAL_FORM = {
    name: '',
    description: ''
}

const CreateRoomBtnModal = () => {
  const {state, open, close} = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);


  const onSubmit = async () => {
    if(!formRef.current.check()){
        return;
    }

    setIsLoading(true);
    const newRoomData = {
        ...formValue,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        admins: {
            [auth.currentUser.uid] : true
        }
    }


    try{
        await database.ref('rooms').push(newRoomData);
        Alert.info(`${formValue.name} has been created!`, 4000);
        setIsLoading(false);
        setFormValue(INITIAL_FORM);
        close();
    }catch(err){
        setIsLoading(false);
        Alert.error(err.message, 4000);
    }
  }

    return (
    <div className='mt-1'>
        
        <Button block color="green" onClick={open}>
            <Icon icon="creative" /> Create New Chat Room
        </Button>


        <Modal show={state} onHide={close}>
            <Modal.Header>
                <Modal.Title>New Chat Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
                    <FormGroup>
                        <ControlLabel>Room name</ControlLabel>
                        <FormControl name="name" placeholder="Enter chat room name" />
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Description</ControlLabel>
                        <FormControl componentClass="textarea" name="description" rows={5} placeholder="Enter room description" />
                    </FormGroup>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button block appearance='primary' onClick={onSubmit} disabled={isLoading}>
                    Create New CHAT Room
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default CreateRoomBtnModal