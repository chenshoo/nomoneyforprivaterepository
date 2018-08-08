import _ from 'lodash'
import React from 'react'
import classNames from 'classnames';

// components
import PopupCover from 'components/PopupCover/PopupCover'
import Text from 'components/Text/Text'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import Grid from 'react-bootstrap/lib/Grid'
import Label from 'components/Label/Label'
import ActivityIndicator from 'components/ActivityIndicator/ActivityIndicator';
import Transition from 'components/Transition/Transition'

// constnats
import menu from 'constants/menu'

class MemePreviewModal extends React.Component {

    state = {
        isLoading: true,
    }

    render() {
        const { urlPath, description, rating, category } = this.props
        const { isLoading } = this.state

        return (
            <Transition>
                <PopupCover className="box-meme-preview-modal">
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                {isLoading && (
                                    <div  className="image-loader">
                                        <ActivityIndicator size="lg" className="center-block"/>
                                    </div>
                                )}
                                <img
                                    onLoad={() => this.setState({ isLoading: false })}
                                    className={classNames('center-block margin-top-medium img-responsive', { 'loading': isLoading })}
                                    src={urlPath}
                                />
                                <Text
                                    dir="rtl"
                                    className="margin-top-medium"
                                    align="center"
                                    theme="white"
                                    capitalized
                                >
                                    {description}
                                </Text>
                                <div className="flex labels-container margin-top-medium">
                                    <Label dir="rtl">{rating * 4} הורדות </Label>
                                    <Label>{_.get(menu, [category, 'title'])}</Label>
                                </div>

                            </Col>
                        </Row>
                    </Grid>
                </PopupCover>
            </Transition>
        )
    }
}

export default MemePreviewModal