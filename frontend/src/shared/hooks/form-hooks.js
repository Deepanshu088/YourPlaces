import { useCallback, useReducer } from "react";

const formReducer = (state, action)=>{
    switch(action.type){
        case 'InputChange': 
            let formIsValid = true;
            for(const inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                inputs: {
                    ...state.inputs,
                    [action.inputId] : { value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            };
        case 'SetData': 
            return{
                inputs: action.inputs,
                isValid: action.formIsValid
            };
        default:
            return state;
    }
}

const useForm = (initialState, initailValidity)=>{
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: initialState,
        isValid : initailValidity
    });

    const InputHandler = useCallback((id, value, isValid) =>{
        dispatch({type: 'InputChange', isValid, value, inputId: id})
    }, []);
    const setFormData = useCallback((value, isValid) =>{
        dispatch({type: 'SetData', formIsValid: isValid, inputs: value})
    }, []);
    
    return [formState, InputHandler, setFormData]
}

export default useForm;