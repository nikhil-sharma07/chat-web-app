import React from 'react'
import { Button, Modal } from 'rsuite';
import { TREE_NODE_DROP_POSITION } from 'rsuite/lib/TreePicker';
import { useCurrentRoom } from '../../../context/current-room.context'
import { useModalState } from '../../../misc/custom-hooks';

const RoomInfoBtnModal = () => {
    const {state,open,close} = useModalState();
    const description = useCurrentRoom(v => v.description);
    const name = useCurrentRoom(v => v.name);

    return (
    <>
        <Button appearance='link' className='px-0' onClick={open}>
            Room Info..
        </Button>

        <Modal show={state} onHide={close}>
            <Modal.Header>
                <Modal.Title>
                    About {name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className='mb-1'>Description</h6>
                <p>{description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button block onClick={close}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default RoomInfoBtnModal