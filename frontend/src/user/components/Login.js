import React, { useContext } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import ErrorModal from '../../shared/components/UIElements/Components/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/Components/LoadingSpinner';
import AuthContext from '../../shared/context/auth-context';
import useForm from '../../shared/hooks/form-hooks';
import useHttp from '../../shared/hooks/http-hooks';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import '../pages/Auth.css';

const Login = (props)=>{
    const context = useContext(AuthContext);
    const { sendRequest, error, isLoading, clearError } = useHttp();

    const [formState, InputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const submitHandler = async e => {
        e.preventDefault();
        try{
            let headers = {
                Authorization: 'Bearer '+ context.token,
                'Content-Type': 'application/json',
            }
            const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/login/`,
                'POST', 
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value }),
                headers
            )
            context.login(data.user._id, data.token);
        }catch(e){
            console.log(e);
        }
    }
    
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Card className='authentication'>
                { isLoading && <LoadingSpinner asOverlay /> }
                <h2>Login Required</h2>
                <form onSubmit={submitHandler}>
                    <Input id='email' element='input' label='E-Mail' type='text' validators={[VALIDATOR_EMAIL()]} errorText='Please enter a valid email!' onInput={InputHandler} ></Input>
                    <Input id='password' element='input' label='Password' type='password' validators={[VALIDATOR_MINLENGTH(5)]} errorText='Please enter a valid password(min 5 characters)' onInput={InputHandler} ></Input>
                    <Button type='submit' disabled={!formState.isValid}>Login</Button>
                </form>
                <Button inverse onClick={props.onToggle} >Switch to Signup</Button>
            </Card>
        </React.Fragment>
    )
}

export default Login;