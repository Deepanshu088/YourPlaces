import React, { useContext } from 'react';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import ErrorModal from '../../shared/components/UIElements/Components/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/Components/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import useForm from '../../shared/hooks/form-hooks';
import useHttp from '../../shared/hooks/http-hooks';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import '../pages/Auth.css';

const SignIn = (props)=>{
    const context = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttp();

    const [formState, InputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        username: {
            value: '',
            isValid: false
        },
        image:{
            value: null,
            isValid: false
        }
    }, false);

    const submitHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', formState.inputs.username.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        console.log(formData);
        
        try{
            let headers = {
                Authorization: 'Bearer '+ context.token,
            }
            const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup/`, 'POST', formData, headers)
            console.log(data)
            console.log(data.user);
            context.login(data.user._id, data.token);
        }catch(e){
            console.log(e);
        }
    }
    
    return(           
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='authentication'>
                { isLoading && <LoadingSpinner asOverlay /> }
                <h2>SignUp Required</h2>
                <form onSubmit={submitHandler}>
                    <Input id='username' element='input' label='UserName' type='text' validators={[VALIDATOR_REQUIRE()]} errorText='Please enter a valid UserName' onInput={InputHandler} ></Input>
                    <ImageUpload  id='image' center= {true} onInput={InputHandler} errorText='Please upload a valid image.' />
                    <Input id='email' element='input' label='E-Mail' type='text' validators={[VALIDATOR_EMAIL()]} errorText='Please enter a valid email!' onInput={InputHandler} ></Input>
                    <Input id='password' element='input' label='Password' type='password' validators={[VALIDATOR_MINLENGTH(5)]} errorText='Please enter a valid password(min 5 characters)' onInput={InputHandler} ></Input>
                    <Button type='submit' disabled={!formState.isValid}>SignUp</Button>
                </form>
                <Button inverse onClick={props.onToggle} >Switch to Login</Button>
            </Card>
        </React.Fragment>
    )
}

export default SignIn;