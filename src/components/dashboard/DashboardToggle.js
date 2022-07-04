import React from 'react'
import {Button, Icon, Drawer} from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';

const DashboardToggle = () => {

    const {state, close, open} = useModalState();

  return (
    <>
        <Button block color="blue"  onClick={open}>
            <Icon icon="dashboard"/>Dashboard
        </Button>
        <Drawer show={state} onHide={close} placement="left">
            <Dashboard />
        </Drawer>
    </>
  )
}

export default DashboardToggle