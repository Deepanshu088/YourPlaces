import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/Components/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Components/LoadingSpinner";
import AuthContext from "../../shared/context/auth-context";
import useForm from "../../shared/hooks/form-hooks";
import useHttp from "../../shared/hooks/http-hooks";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import './NewPlace.css'

const NewPlace = ()=>{
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const { sendRequest, isLoading, error, clearError } = useHttp();
    const [formState, InputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image:{
            value:null,
            isValid: false
        }
    }, false);


    const inputHandler = useCallback((id, value, isValid)=>{
        InputHandler(id, value, isValid);
    }, [InputHandler])


    const onSubmitHandler = async e =>{
        const formData = new FormData();

        formData.append('title',formState.inputs['title'].value);
        formData.append('description',formState.inputs['description'].value);
        formData.append('address',formState.inputs['address'].value);
        formData.append('image',formState.inputs['image'].value);
        e.preventDefault();
        try{
            let headers = {
                Authorization: 'Bearer '+ authContext.token,
            }
            console.log(headers);
            const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/`,'POST', formData, headers)
            console.log(data)
            history.push(`/`+(authContext.userId)+`/places/`)
        }catch(e){
            console.log(e);
        }
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            { isLoading && <LoadingSpinner  asOverlay /> }
            {   !isLoading &&
                <form className='place-form' onSubmit={onSubmitHandler}>
                    <Input id='title' element='input' type='text' label='Title' validators={[VALIDATOR_REQUIRE()]} errorText='Please enter a vaid input!' onInput={inputHandler}/>
                    <ImageUpload id='image' onInput={InputHandler} center={true} errorText='Please upload a valid image.' />
                    <Input  id='description' element='textarea' label='Description' validators={[VALIDATOR_MINLENGTH(5)]} errorText='Please enter a vaid decription (atleast 5 charactors).' onInput={inputHandler}/>
                    <Input  id='address' element='input' label='Address' validators={[VALIDATOR_REQUIRE()]} errorText='Please enter a valid address' onInput={inputHandler}/>
                    <Button type='submit' disabled={!formState.isValid}>Add Place</Button>
                </form>
            }
        </React.Fragment>
    )
}

export default NewPlace;