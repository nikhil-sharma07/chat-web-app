import React, { useCallback } from 'react'
import {Alert,Button, Icon, Drawer} from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';
import {auth} from '../../misc/firebase'

const DashboardToggle = () => {

    const {state, close, open} = useModalState();
    const isMobile=useMediaQuery(`(max-width: 992px)`)


    const onSignOut = useCallback(() => {
      auth.signOut();
      Alert.info('Signed out', 4000);
      close();
    }, [close])

  return (
    <>
        <Button block color="blue"  onClick={open}>
            <Icon icon="dashboard"/>Dashboard
        </Button>
        <Drawer full={isMobile} show={state} onHide={close} placement="left">
            <Dashboard onSignOut={onSignOut}/>
        </Drawer>
    </>
  )
}

export default DashboardToggle