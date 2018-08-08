import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

// components
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
import Title from 'components/Title/Title'
import Text from 'components/Text/Text'
import Icon from 'components/Icon/Icon'
import UserMessage from './UserMessage/UserMessage';
import Loader from 'components/Loader/Loader';
import ContactPage from 'containers/BugsContainer/ContactPage/ContactPage';

// actions
import { fetchUserMessages, updateUserMessageLikes } from 'actions/user-messages-actions/user-messages-actions'


class BugsContainer extends Component {

    componentWillMount() {
        this.props.fetchUserMessages();
    }

    render() {
        const { history, messages , updateUserMessageLikes, isLoading, match  } = this.props;

        const arrayMessages = _.values(messages) || [];

        const sortedMessages = arrayMessages.sort((a, b) => new Date(b.date) - new Date(a.date));


        return (
            <Grid className="box-bugs-container">
                <Title className="margin-top-large" theme="white">
                    בקשות ודיווחים על באגים
                </Title>
                <Col xs={10} sm={6} className="center-block  clearfix float-none">
                    <Title theme="white" size="h3" className="text-center margin-top-medium margin-bottom-medium ">
                        אם גיליתם באגים, יש לכם הצעות לשיפור או שברצונכם להוסיף ממים למאגר, מוזמנים לשלוח לי הודעה.
                    </Title>
                </Col>

                <div className="margin-top-medium margin-bottom-small cursor-pointer clearfix"
                     onClick={() => history.push('/bugs-page/contact-page')}>
                    <Icon isRound theme="white" className="margin-left-medium pull-right" name="PLUS"/>
                    <Text className="pull-right add-action" inline theme="white">
                    הוספת דיווח על באג / הצעות לשיפור
                    </Text>
                </div>
                <Row>
                    {
                        isLoading
                            ?
                        <Loader className="margin-top-extra-large" />
                            :
                        _.map(sortedMessages, post => (
                            <UserMessage
                                key={post.id}
                                updateUserMessageLikes={updateUserMessageLikes}
                                post={post}
                            />
                        ))
                    }
                </Row>

                <Route path={`${match.url}/contact-page`} component={ContactPage}/>

            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.userMessages.isLoading,
        messages: state.userMessages.messages
    }
}

export default connect(mapStateToProps, { fetchUserMessages, updateUserMessageLikes })(BugsContainer)