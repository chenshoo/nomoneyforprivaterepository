import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';

// components
import Icon from 'components/Icon/Icon';
import Popover from 'components/Popover/Popover';
import OverlayTrigger from 'components/OverlayTrigger/OverlayTrigger';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

// constants
import colors from 'constants/colors';

const FieldButton = ({ onClick, text, icon, className, children, active }) => (
    <div className={classNames(className , 'text-control__btn', { active })} onClick={onClick}>
        {icon ? <Icon name={icon}/> : text}
        {children}
    </div>
);

class MemeTextFieldButtons extends React.Component {

    state = {
        toggleColor: false,
        toggleAlign: false,
        toggleFontWeight: false,
        toggleSize: false,
    }

    toggleActive = type => () =>  {
        this.setState({ [type]: !this.state[type] })
    }


    render() {

        const { handleAction, currentColor } = this.props;

        return (
            <div className="flex">

                <FieldButton
                    onClick={() => handleAction('remove')}
                    icon={'TRASH'}
                />

                <OverlayTrigger
                    onClick={this.toggleActive('toggleAlign')}
                    rootClose={true}
                    placement="bottom"
                    onExit={this.toggleActive('toggleAlign')}
                    trigger={['click', 'blur']}
                    overlay={
                    <Popover theme="navy" id="align-popover">
                        <Row className="clickable">
                            <Col onClick={() => handleAction('alignTextLeft')}  xs={4}><Icon theme="white" name={'ALIGN_LEFT'}/></Col>
                            <Col onClick={() => handleAction('alignTextCenter')} xs={4}><Icon theme="white"  name={'ALIGN_CENTER'}/></Col>
                            <Col onClick={() => handleAction('alignTextRight')} xs={4}><Icon theme="white"  name={'ALIGN_RIGHT'}/></Col>
                        </Row>
                    </Popover>}
                >
                    <FieldButton
                        icon={'ALIGN_CENTER'}
                    />
                </OverlayTrigger>

                {/*<OverlayTrigger*/}
                    {/*onClick={this.toggleActive('toggleFontWeight')}*/}
                    {/*rootClose={true}*/}
                    {/*placement="bottom"*/}
                    {/*trigger={['click']}*/}
                    {/*onExit={this.toggleActive('toggleFontWeight')}*/}
                    {/*overlay={*/}
                    {/*<Popover theme="navy" id="weight-popover">*/}
                        {/*<Row>*/}
                            {/*<Col  onClick={() => handleAction('makeFontLight')} xs={6} className="clickable text-center">*/}
                                {/*<Icon size="xs" theme="white" name="A" />*/}
                            {/*</Col>*/}
                            {/*<Col onClick={() => handleAction('makeFontBold')} xs={6} className="clickable text-center weight-600">*/}
                                {/*<Icon theme="white" name="A" />*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                    {/*</Popover>*/}
                {/*}>*/}

                    {/*<FieldButton>*/}
                        {/*<Icon name="BOLD"*/}
                    {/*/>*/}
                    {/*</FieldButton>*/}
                {/*</OverlayTrigger>*/}

                <OverlayTrigger
                    onClick={this.toggleActive('toggleColor')}
                    placement="bottom"
                    rootClose={true}
                    onExit={this.toggleActive('toggleColor')}
                    trigger={['click', 'blur']}
                    overlay={
                    <Popover theme="navy" id="color-popover">
                        <Row>
                            <Col className="clickable" onClick={() => handleAction('makeFontBlack')} xs={6}>
                                <Icon  theme="black" name={'TEXT_COLOR'}/>
                            </Col>
                            <Col className="clickable" onClick={() => handleAction('makeFontWhite')} xs={6}>
                                <Icon theme="white" name={'TEXT_COLOR'}/>
                            </Col>
                        </Row>
                    </Popover>
                }>
                    <FieldButton
                        className={classNames({ 'black': currentColor === colors.BLACK })}
                        icon={'TEXT_COLOR'}
                    />
                </OverlayTrigger>

                <OverlayTrigger
                    onExit={this.toggleActive('toggleSize')}
                    onClick={this.toggleActive('toggleSize')}
                    rootClose={true} placement="bottom" trigger={['click', 'blur']}
                    overlay={
                    <Popover theme="navy" id="color-popover">
                        <Row>
                            <Col className="clickable" onClick={() => handleAction('makeFontSmaller')} xs={6}>
                                <Icon theme="white" name={'MINUS'}/>
                            </Col>
                            <Col className="clickable" onClick={() => handleAction('makeFontLarger')} xs={6}>
                                <Icon  theme="white" name={'PLUS'}/>
                            </Col>
                        </Row>
                    </Popover>
                }>
                    <FieldButton
                        icon={'TEXT_SIZE'}
                    />
                </OverlayTrigger>

            </div>
        )
    }
}

export default MemeTextFieldButtons;
