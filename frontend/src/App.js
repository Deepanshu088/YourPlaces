import React, { Fragment, Suspense, useContext } from 'react';
import  { BrowserRouter as Router, Route, Redirect,Switch } from 'react-router-dom';

// import Users from './user/pages/Users';
// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
// import UserPlaces from './places/pages/UserPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UIElements/Components/LoadingSpinner';
import AuthContext from './shared/context/auth-context';
// import Auth from './user/pages/Auth';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const Auth = React.lazy(() => import('./user/pages/Auth'));


function App() {
    const context = useContext(AuthContext);

    return (
        <Fragment>
            <Router>
                <MainNavigation />
                <main>
                    <Suspense fallback={
                        <div className='center'>
                            <LoadingSpinner />
                        </div>
                    }>    
                        <Switch>
                            <Route path='/' exact>
                                <Users />
                            </Route>
                            <Route path='/:userId/places' exact>
                                <UserPlaces />
                            </Route>
                            {   context.isLoggedIn &&
                                <Switch>
                                    <Route path='/places/new' exact>
                                        <NewPlace />
                                    </Route>
                                    <Route path='/places/:placeId' exact>
                                        <UpdatePlace />
                                    </Route>
                                    <Redirect to="/" />
                                </Switch>
                            }
                            {   !context.isLoggedIn &&
                                <Switch>
                                    <Route path='/auth'>
                                        <Auth />
                                    </Route>
                                    <Redirect to="/auth" />
                                </Switch>
                            }
                        </Switch>
                    </Suspense>
                </main>
            </Router>
        </Fragment>
    );
}

export default App;