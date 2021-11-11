import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card/Card";
import ErrorModal from "../../shared/components/UIElements/Components/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Components/LoadingSpinner";
import AuthContext from "../../shared/context/auth-context";
import useHttp from "../../shared/hooks/http-hooks";
import PlaceList from "../components/PlaceList";

const UserPlaces = props =>{
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const userId = useParams().userId;
    const context = useContext(AuthContext);

    const { sendRequest, error, isLoading, clearError } = useHttp();

    useEffect(()=>{
        const fetchUserPlaces = async()=> { 
            try{
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/`+ userId);
                setLoadedPlaces(data.places);
            }catch(e){
                console.log(e);
            }
        }
        fetchUserPlaces();
    }, [sendRequest, userId]);
    
    let content =  userId === context.userId ? 
        <Card>
            <h2>No Places Found. Maybe create one?</h2>
            <Button to='/places/new'>Share Place </Button>
        </Card>
        : 
        <Card>
            <h2>No places posted by user.</h2>
        </Card>
    ;

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            { isLoading && <LoadingSpinner  asOverlay /> }
            { isLoading && 
                <div className='place-list center'>
                    <Card>
                        <h2>Searching for places...</h2>
                    </Card>
                </div> 
            }
            {
                !isLoading && loadedPlaces.length === 0 &&
                <div className='place-list center'>
                        {content}
                </div>
            }
            <PlaceList items={loadedPlaces} />
        </Fragment>
    );
}

export default UserPlaces;