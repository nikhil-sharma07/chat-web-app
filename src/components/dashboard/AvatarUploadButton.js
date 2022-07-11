import React,{useState, useRef} from 'react';
import {Modal,Alert,Button} from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import AvatarEditor from 'react-avatar-editor';
const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ['/image/png', 'image/jpeg'];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const getBlob = canvas => {
    return new Promise( (resolve, reject) => {
        canvas.toBlob(blob => {
            if(blob){
                resolve(blob);
            }else{
                reject(new Error('File Process Error'));
            }
        });
    });
};

const AvatarUploadButton = () => {
    const {state,open,close} = useModalState();
    const {profile} = useProfile();
    const [img, setImg] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const avatarEditorRef = useRef();

    const onFileInputChange = (ev) => {
        const currFiles = ev.target.files;
        if(currFiles.length === 1){
            const file = currFiles[0];
            if(isValidFile(file)){
                setImg(file);
                open();
            }else{
                Alert.warning(`Wrong file type ${file.type}`, 4000);
            }
        }
    }

    const onUploadClick = async () => {
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
        setIsLoading(true);
        try{
            const blob = await getBlob(canvas);
            const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');
            const uploadAvatarResult = await avatarFileRef.put(blob, {
                cacheControl: `public, max-age=${3600*24*3}`
            });

            const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
            const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');
            userAvatarRef.set(downloadUrl);
            setIsLoading(false);
            Alert.info('Avatar has been uploaded', 4000);
        }catch(err){
            setIsLoading(false);
            console.log('hii');
            Alert.error(err.message, 4000);
        }
    }


    return (
        <div className='mt-3 text-center'>
            <div>
                <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
                    Select New Avatar
                    <input id='avatar-upload' type="file" className='d-none' accept={fileInputTypes} onChange={onFileInputChange}/>
                </label>


                <Modal show={state} onHide={close}>
                    <Modal.Header>
                    <Modal.Title>
                        Upload New Profile Picture
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='d-flex justify-content-center align-items-center h-100'>    
                        {img && 
                            <AvatarEditor
                            ref={avatarEditorRef}
                            image={img}
                            width={200}
                            height={200}
                            border={10}
                            borderRadius={100}
                            rotate={0}
                            />
                        }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block apperance="ghost" onClick={onUploadClick} disabled={loading}>
                            Upload New Avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
      )
}

export default AvatarUploadButton