import _ from 'lodash'
import React from 'react'

// components
import Col from 'react-bootstrap/lib/Col'
import Button from 'components/Button/Button'

// helpers
import helpers from 'helpers/helpers'

const Buttons = () => (
    <div className="buttons-container">
        {_.times(6, () => (
            <Col
                className={'padding-right-none padding-left-none'}
                xs={2}
                sm={6}
            >
                <Button
                    bsStyle="brand-gray-border"
                    block
                />
            </Col>
        ))}
    </div>

)
export default ({ style }) => (
    <div style={style} className="box-dashboard-skeleton box-generator-dashboard">
        {helpers.isMobile() && <Buttons />}
        <div className="text-fields-container">
            <div className="mock-text-field">
                <div className="mock-input"/>
                <div className="mock-buttons"/>
            </div>

            <div className="mock-text-field">
                <div className="mock-input"/>
                <div className="mock-buttons"/>
            </div>
        </div>
        {!helpers.isMobile() && <Buttons />}
    </div>
)