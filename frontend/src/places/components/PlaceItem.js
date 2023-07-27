import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card/Card'
import Modal from '../../shared/components/UIElements/Card/Modal';
import ErrorModal from '../../shared/components/UIElements/Components/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/Components/LoadingSpinner';
import Map from '../../shared/components/UIElements/Map/Map';
import AuthContext from '../../shared/context/auth-context';
import useHttp from '../../shared/hooks/http-hooks';
import './PlaceItem.css'

const PlaceItem = props =>{
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const { sendRequest, error, isLoading, clearError } = useHttp();

    const [showMap, setShowMap] = useState(false);
    const [showConfirm, setShowComfirm] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => setShowComfirm(true);
    const cancelDeleteWarningHandler = () => setShowComfirm(false);

    const confirmDeleteWarningHandler = async () => {
        
        try{
            let headers = {
                Authorization: 'Bearer '+ context.token,
            }
            const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${props.id}/`,'DELETE', null ,headers)
            console.log(data);
        }catch(e){
            console.log(e);
        }
        setShowComfirm(false);
        navigate(`/`);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            { isLoading && <LoadingSpinner asOverlay /> }
            <Modal 
                show={showMap} 
                onCancel={closeMapHandler} 
                header={props.address} 
                contentClass='place-item__modal-content' 
                footerClass='place-item__modal-actions' 
                footer={<Button onClick={closeMapHandler}>Close</Button>}
            >
                <div className='map-container'>
                    <Map location={props.coordinates} />
                </div>
            </Modal>
            <Modal
                show={showConfirm}
                onCancel={cancelDeleteWarningHandler}
                header='Are you sure?'
                footerClass='place-item__model-actions'
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteWarningHandler}>Cancel</Button>
                        <Button danger onClick={confirmDeleteWarningHandler}>Delete</Button>
                    </React.Fragment>
                }
            >
                <p>Do you really want to delete this place? Please note that it cant be undone!</p>
            </Modal>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={`${props.image}`} alt={props.title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={openMapHandler}> View on Map </Button>
                        {context.userId === props.creatorId && <Button to={`/places/${props.id}`}>Edit</Button>}
                        {context.userId === props.creatorId && <Button danger onClick={showDeleteWarningHandler} >Delete</Button>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default PlaceItem;