import React, { useState } from 'react';
// import Button from '../../shared/components/FormElements/Button';
// import Input from '../../shared/components/FormElements/Input';
// import Card from '../../shared/components/UIElements/Card/Card';
// import useForm from '../../shared/hooks/form-hooks';
// import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Login from '../components/Login';
import SignIn from '../components/Signin';
import './Auth.css';

const Auth = ()=>{

    const [isLogin, setIsLogin] = useState(true);
    const toggleHandler = ()=> setIsLogin(state => !state);

    return(
        <React.Fragment>
            {isLogin && <Login onToggle={toggleHandler} />}
            {!isLogin && <SignIn onToggle={toggleHandler} />}
        </React.Fragment>
    )
}

export default Auth;