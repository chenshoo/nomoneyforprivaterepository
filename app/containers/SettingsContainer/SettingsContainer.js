import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

// actions
import { fetchUser , removePersonalMemes } from 'actions/user-actions/user-actions';

// components
import Title from 'components/Title/Title';
import Text from 'components/Text/Text';
import Button from 'components/Button/Button'
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
class SettingsContainer extends React.Component {

    static defaultProps = {
        user: {}
    }


    render() {
        const { user, removePersonalMemes, isFetching } = this.props;

        return (
            <Grid>
                <Row>
                    <Col xs={12} className="padding-top-small">
                        <Title theme="white">
                            הגדרות אישיות
                        </Title>

                        <hr/>

                        <Text align="left">
                            email: {user.email}
                        </Text>

                        <hr/>

                        <Button block isLoading={isFetching} onClick={removePersonalMemes}>
                            מחיקת ממים מועדפים
                        </Button>


                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.authenticated,
        user: state.auth.user,
        isFetching: _.get(state, 'auth.isFetching'),
    }
}

export default connect(mapStateToProps, { fetchUser, removePersonalMemes })(SettingsContainer);