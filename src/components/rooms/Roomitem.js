import React from 'react';
import TimeAgo from 'timeago-react';

const Roomitem = () => {
  return (
    <div>
        
        <div className='d-flex justify-content-between align-items-center'>
            <h3 className='text-disappear'>Room Name</h3>
            <TimeAgo datetime={new Date()} className="font-normal text-black-45"/>
        </div>

        <div className='d-flex align-items-center text-block-70'>
            <span>No messages yet...</span>
        </div>

    </div>
  )
}

export default Roomitem