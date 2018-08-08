import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import {  Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// helpers
import { blobToString } from 'containers/Generator/generator-helpers';

// components
import Button from 'components/Button/Button';
import NewMemesContainer from './NewMemesContainer/NewMemesContainer';
import SuggestedMemesContainer from './SuggestedMemesContainer/SuggestedMemesContainer';
import UserGeneratedMemesContainer from './UserGeneratedMemesContainer/UserGeneratedMemesContainer';
import EditMemeContainer from './EditMemesContainer/EditMemesContainer';
import Panel from 'components/Panel/Panel';
import Title from 'components/Title/Title'
import EditItemsContainer from './EditItemsContainer/EditItemsContainer';

// config
import config from 'config/config';

// constants
import constants from 'constants/global'

class Admin extends Component {

    componentDidMount() {
        console.log('in admin');
    }


    render() {

        const { match, isAdmin } = this.props;


        if(!isAdmin) {
            return null;
        }


        return (
            <div className="box-admin container">
                <Title className="margin-top-large margin-bottom-large">
                    Admin
                </Title>

                <div className="flex space-between dashboard">
                    <div>
                        <Button
                            size="sm"
                            center
                            componentClass={Link}
                            to={`${match.url}/user-generated-memes`}
                        >
                            user generated memes
                        </Button>
                    </div>

                    <div>
                        <Button
                            size="sm"
                            center
                            componentClass={Link}
                            to={`${match.url}/items`}
                        >
                            items
                        </Button>
                    </div>
                    <div>
                        <Button
                            size="sm"
                            center
                            componentClass={Link}
                            to={`${match.url}/edit-memes`}
                        >
                            Edit Existing memes
                        </Button>
                    </div>
                    <div>
                        <Button
                            size="sm"
                            center
                            componentClass={Link}
                            to={`${match.url}/suggested-memes`}
                        >
                            Show Suggested Memes
                        </Button>
                    </div>
                    <div>
                        <Button
                            size="sm"
                            center
                            componentClass={Link}
                            to={`${match.url}/new-memes`}
                        >
                            Upload New Memes
                        </Button>
                    </div>
                </div>

                <Panel className="containers margin-top-large">
                    <Route path={`${match.url}/new-memes`} component={NewMemesContainer} />
                    <Route path={`${match.url}/user-generated-memes`} component={UserGeneratedMemesContainer} />
                    <Route path={`${match.url}/edit-memes`} component={EditMemeContainer} />
                    <Route path={`${match.url}/suggested-memes`} component={SuggestedMemesContainer} />
                    <Route path={`${match.url}/items`} component={EditItemsContainer} />

                </Panel>

            </div>
        )
    }
}


function mapStateToProps(state) {

    return {
        isAdmin: _.get(state, 'auth.user.isAdmin')
    }
}


export default connect(mapStateToProps)(Admin)