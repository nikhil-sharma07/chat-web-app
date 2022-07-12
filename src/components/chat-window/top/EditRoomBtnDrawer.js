import React,{memo} from 'react';
import { useParams } from 'react-router-dom';
import {Alert , Button, Drawer} from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import EditableInputs from '../../dashboard/EditableInputs';
const EditRoomBtnDrawer = () => {

    const {state,open,close} = useModalState();
    const name = useCurrentRoom(v=>v.name);
    const description = useCurrentRoom(v=>v.description);
    const {chatId} = useParams();

    const isMobile = useMediaQuery('(max-width: 992px)');


    const updateSave = (key,value) => {
        database.ref(`/rooms/${chatId}`).child(key).set(value).then(() => {
            Alert.success('Successfully updated', 4000);
        }).catch(err => {
            Alert.error(err.message, 4000);
        })
    }

    const onNameSave = (newName) => {
        updateSave('name', newName);
    }

    const onDescriptionSave = (newDesc) => {
        updateSave('description', newDesc);
    }

    return (
    <div>
        <Button classname = "br-circle" size="sm" color="red" onClick = {open}>
            A
        </Button>


        <Drawer full={isMobile} show={state} onHide={close} placement="right">
            <Drawer.Header>
                <Drawer.Title>
                    Edit Room
                </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <EditableInputs 
                    initialValue={name}
                    onSave={onNameSave}
                    label={<h6 className='mb-2'>Name</h6>}
                    emptyMsg="Name is required"
                />
                <EditableInputs 
                    componentClass="textarea"
                    rows={5}
                    initialValue={description}
                    onSave={onDescriptionSave}
                    emptyMsg="Description is required"
                    wrapperClassName='mt-3'
                />
            </Drawer.Body>
            <Drawer.Footer></Drawer.Footer>

        </Drawer>
    </div>
  )
}

export default memo(EditRoomBtnDrawer);