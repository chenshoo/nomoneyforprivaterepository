import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// containers
import MemeSection from 'containers/MemeSection/MemeSection';
import Home from 'containers/Home/Home';
import Generator from 'containers/Generator/Generator';
import SignUp from 'containers/Login/SignUpContainer';
import SignIn from 'containers/Login/SignInContainer';
import CategoriesContainer from 'containers/CategoriesContainer/CategoriesContainer';
import SearchContainer from 'containers/SearchContainer/SearchContainer';
import Settings from 'containers/SettingsContainer/SettingsContainer';

// components
import Admin from 'components/Admin/Admin';
import BugsPage from 'containers/BugsContainer/BugsContainer';
import MemeSuggestionsForm from 'components/MemeSuggestionsForm/MemeSuggestionsForm';

export default class MainView extends Component {

    render(){

        return(
            <div style={{width: '100%', backgroundColor:'#0097EB', overflow: 'scroll'}}>
                <Switch>
                    <Route path='/memes/:category' component={MemeSection} />
                    <Route path='/suggest-memes' component={MemeSuggestionsForm} />
                    <Route path="/bugs-page" component={BugsPage}/>
                    <Route path="/categories" component={CategoriesContainer}/>
                    <Route path="/search" component={SearchContainer}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/sign-up" component={SignUp}/>
                    <Route path="/sign-in" component={SignIn}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </div>
        )
    }
}


