import _ from 'lodash'
import React, { Component } from 'react';
import classNames from'classnames';

// assets
import defaultAvatar from 'assets/images/default-avatar.png'
import logo from 'assets/images/logo.png';

// components
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Title from 'components/Title/Title'
import Text from 'components/Text/Text'
import Icon from 'components/Icon/Icon'
import Avatar from 'components/Avatar/Avatar';

class UserMessage extends Component {

    state = {
        likesClicked: false
    }

    updateUserLikes = () => {
        const { updateUserMessageLikes, post } = this.props;
        this.setState({ likesClicked : true })
        updateUserMessageLikes(post);
    }

    render() {
        const { post } = this.props;
        const name = post.name;
        const isBug = (post.type === 'bug');

        return(
            <div className="box-user-message">
                <Title className="margin-bottom-medium section-title" size="h2">
                    <Icon name={isBug ? 'ERROR' : 'LAMP'} theme={isBug ? 'danger' : 'brand'} className={classNames( 'margin-left-extra-small')} />
                    {isBug ? 'באג' : 'הצעה'}
                </Title>
                <Row className="inner-container" key={post.id} >
                    <Col className="likes-container area" xs={12} sm={1}>
                        <Icon
                            theme="success"
                            size="xl"
                            isRound
                            isActive={this.state.likesClicked}
                            className="margin-right-small"
                            name="THUMBS_UP"
                            onClick={!this.state.likesClicked ? this.updateUserLikes : _.noop}
                        />
                        <Text className="margin-top-small counter" theme="black">{post.likes || 0}</Text>
                    </Col>
                    <Col xs={12} sm={8} className="area">
                        <Title align="right" size="h4">
                            <u> פרטים:</u>
                        </Title>
                        <Text theme="black" size="sm" className="margin-top-medium margin-bottom-medium">
                            {post.message}
                        </Text>
                    </Col>

                    <Col xs={12} sm={3} className="area" >
                        <Avatar imgSrc={name === 'ניר בן-יאיר' ? logo : defaultAvatar} size="sm"
                                block
                                className="margin-bottom-small center-block"/>
                        {post.name && (
                            <Text align="center" theme="black" size="sm">
                                שם המדווח:
                            </Text>
                        )}
                        <Title size="h3" className="margin-top-extra-small">
                            {post.name}
                        </Title>
                        <Text align="center" theme="black" size="sm">
                            {post.date}
                        </Text>
                    </Col>
                </Row>
            </div>

        )
    }

}

UserMessage.UserMessage = {
    post: {}
}

export default UserMessage;