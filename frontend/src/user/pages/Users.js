import { Fragment, useEffect, useState } from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import ErrorModal from "../../shared/components/UIElements/Components/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Components/LoadingSpinner";
import useHttp from "../../shared/hooks/http-hooks";
import UsersList from "../components/UsersList";

const Users = () =>{

    const { sendRequest, isLoading, error, clearError} = useHttp();
    const [ users, setUsers ]= useState([]); 

    useEffect(()=>{
        const fetchUsers = async ()=>{
            const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/`);
            if(data.error){
                console.log(data.message)
            }else{
                setUsers(data.users || []);
            }
        }

        fetchUsers();

    }, [sendRequest]);

    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            { isLoading && <div className='center'>
                    <Card>
                        <h2>Searching for Users....</h2>
                    </Card>
                </div>
            }
            { isLoading && <LoadingSpinner asOverlay /> }
            { !isLoading && <UsersList items={users} /> }
        </Fragment>
    )
}

export default Users;