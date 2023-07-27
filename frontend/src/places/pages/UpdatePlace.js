import { useNavigate, useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './NewPlace.css'
import useForm from '../../shared/hooks/form-hooks';
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import useHttp from '../../shared/hooks/http-hooks';
import LoadingSpinner from '../../shared/components/UIElements/Components/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/Components/ErrorModal';
import AuthContext from '../../shared/context/auth-context';

const UpdatePlace = props =>{
    const authContext = useContext(AuthContext);
    const placeId = useParams().placeId;
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    const { sendRequest, error, clearError, isLoading: isLoad} = useHttp();

    const [formState, InputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);
    const inputHandler = useCallback((id, value, isValid)=>{
        InputHandler(id, value, isValid);
    }, [InputHandler])
    

    const onSubmitHandler = async e =>{
        e.preventDefault();

        try{
            let headers = {
                Authorization: 'Bearer '+ authContext.token,
                'Content-Type': 'application/json'
            }
            const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}/`, 
                'PATCH', 
                JSON.stringify({
                    title: formState.inputs['title'].value,
                    description: formState.inputs['description'].value,
                }),
                headers
            );
            console.log(data)
            navigate(`/${authContext.userId}/places`);
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        const initializingForm = async ()=>{
            try{
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}/`)
                let identifiedPlace = data.place;
                if(identifiedPlace){
                    setFormData(
                        {
                            title: {
                                value: identifiedPlace.title,
                                isValid: true
                            },
                            description: {
                                value: identifiedPlace.description,
                                isValid: true
                            }
                        }
                        , true
                    );
                }
            }catch(e){
                console.log(e);
            }
            setIsLoading(false);
        }
        initializingForm(); 
    }, [setFormData, placeId, sendRequest]);

    if(isLoading){
        return <LoadingSpinner asOverlay />
    }

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className='place-form' onSubmit={onSubmitHandler}>
                <Input id='title' element='input' type='text' label='Title' validators={[VALIDATOR_REQUIRE()]} errorText='Please enter a valid input!' value={formState.inputs.title.value} valid={formState.inputs.title.isValid} onInput={inputHandler} />
                <Input id='description' element='textArea' type='text' label='Description' validators={[VALIDATOR_MINLENGTH(5)]} errorText='Please enter a valid description (min 5 characters)' value={formState.inputs.description.value} valid={formState.inputs.description.isValid} onInput={inputHandler} />
                <Button type='submit' disabled={!formState.isValid}>Update Place</Button>
            </form>
            { isLoad && <LoadingSpinner  asOverlay /> }
        </Fragment>
    );
}

export default UpdatePlace;