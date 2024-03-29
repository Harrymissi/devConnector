import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/dashboard/CreateProfile';
import AddExperience from './components/dashboard/AddExperience';
import AddEducation from './components/dashboard/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not_found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import {logoutUser, setCurrentUser} from './store/actions/authActions';
import {clearCurrentProfile} from "./store/actions";

import PrivateRoute from './components/common/PrivateRoute';
import EditProfile from "./components/dashboard/EditProfile";

// CHECK FOR TOKEN
if (localStorage.jwtToken) {
    // Set the auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and expiration
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout the user
        store.dispatch(logoutUser());
        // TODO: Clear Current Profile
        store.dispatch(clearCurrentProfile());

        // Redirect to login
        window.location.href = '/';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <div className="container">
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/profiles" component={Profiles}/>
                            <Route exact path="/profile/:handle" component={Profile}/>
                            <Route exact path="/not-found" component={NotFound}/>
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                                <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                                <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                                <PrivateRoute exact path="/add-education" component={AddEducation}/>
                                <PrivateRoute exact path="/feed" component={Posts}/>
                                <PrivateRoute exact path="/post/:id" component={Post}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
