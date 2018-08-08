import _ from 'lodash';
import React, {Component} from 'react'
import classNames from 'classnames';

// constants
import constants from './constants'
import colors from 'constants/colors';

// helpers
import helpers from 'helpers/helpers';

// components
import MemeTextFieldButtons from 'components/MemeTextField/MemeTextFieldButtons';
import FormControl from 'components/FormControl/FormControl';

const getSharedStyles =  (canvas, position, initialFontSize) => {
    return {
        width: (canvas.width * 0.975),
        left: (canvas.width) / 100,
        fontSize: initialFontSize,
        top: helpers.getTextPosition(position, canvas, initialFontSize),
        lineHeight: 1.1
    };
}

export default class MemeTextField extends Component {

    state = {

        textValue: '',

        fillStyle: {},
        strokeStyle: {},

        fillTextBox: {},

        strokeTextBox: {},

        isFocused: false
    }

    componentDidMount() {
        const { canvas, position , format } = this.props;
        const shouldStyleTextToDankFormat = (format === 'dankFormat' && position === 'top');
        this.initializeField({ canvas, position });
        if (shouldStyleTextToDankFormat) {
            this.handleAction('makeFontBlack');
            setTimeout(() =>  this.styleBothLayers({textAlign: 'right'}, {textAlign: 'right'}), 500);
            setTimeout(() =>  this.styleBothLayers({fontSize: helpers.isMobile() ?  24 : 28}, {fontSize: helpers.isMobile() ?  24 : 28}), 700);
            setTimeout(() =>  this.styleBothLayers({lineHeight: 1.3}, {lineHeight: 1.3}), 90000)

        }
    }

    initializeField = ({ canvas, position }) => {
        const initialFontSize = (canvas.width / 10);

        const sharedStyles = getSharedStyles(canvas, position, initialFontSize);

        const strokeStyle = {
            ...constants.strokeStyle,
            ...sharedStyles,
            strokeWidth: (parseInt(initialFontSize) / 6),
        };

        const fillStyle = {
            ...constants.fillStyle,
            ...sharedStyles,
        };

        this.setState({

            textValue: '',

            fillStyle: fillStyle,
            strokeStyle: strokeStyle,

            fillTextBox: new fabric.Textbox("", {...fillStyle}),

            strokeTextBox: new fabric.Textbox("", {...strokeStyle})
        });
    }

    componentWillUnmount(){
        const { canvas } = this.props;
        if (canvas) {
            canvas.remove(this.state.fillTextBox);
            canvas.remove(this.state.strokeTextBox);
            this.setState({ textValue : ''});
        }

    }

    setCanvasDirection = (value) => {
        const isRtl = helpers.isRTL(value);
        const wantedDir = isRtl ? 'rtl' : 'ltr';
        document.querySelector('.upper-canvas').dir = wantedDir;
        document.getElementById('c').dir = wantedDir;
    }

    onInputChange = ({ target: { value } }) => {
        this.setState({textValue: value});

        const { fillTextBox, strokeTextBox, alreadyOnCanvas } = this.state;
        const  { canvas } = this.props
        this.setCanvasDirection(value)
        if (!alreadyOnCanvas) {
            this.addTextToCanvas(value)
            this.bindTextBoxEvents()
            this.setStrokeLayerPos(fillTextBox, strokeTextBox)
        }

        strokeTextBox.setText(value)
        strokeTextBox.bringForward()
        fillTextBox.setText(value)
        fillTextBox.bringToFront();
        this.setStrokeLayerPos(fillTextBox, strokeTextBox)
        canvas.renderAll();
    }


    addTextToCanvas = () => {
        const { canvas } = this.props
        const { strokeTextBox, fillTextBox } = this.state;
        this.setState({ alreadyOnCanvas : true })
        canvas.add(strokeTextBox)
        canvas.add(fillTextBox)
    }

    bindTextBoxEvents = () => {

        const { fillTextBox, strokeTextBox } = this.state;

        //on move
        fillTextBox.on('moving', () => {
            const topPos = (fillTextBox.top - (strokeTextBox.strokeWidth / 2 * fillTextBox.scaleX));
            const leftPos = (fillTextBox.left - (strokeTextBox.strokeWidth / 2 * fillTextBox.scaleY))
            strokeTextBox.top = topPos
            strokeTextBox.left = leftPos;
            strokeTextBox.bringToFront()
            fillTextBox.bringToFront();
            this.styleBothLayers({ top: topPos, left: leftPos, width: fillTextBox.width })
        })

        //on rotating
        fillTextBox.on('rotating', function (e) {
            strokeTextBox.setAngle(fillTextBox.angle)
        })

        //on scaling
        fillTextBox.on('scaling', function (e) {
            strokeTextBox.setWidth(fillTextBox.width)
            strokeTextBox.top = fillTextBox.top - (strokeTextBox.strokeWidth / 2 * fillTextBox.scaleX)
            strokeTextBox.left = fillTextBox.left - (strokeTextBox.strokeWidth / 2 * fillTextBox.scaleY)
        })
    }

    //Set stroke position
    setStrokeLayerPos = (fill, stroke) => {
        stroke.top = fill.top - (stroke.strokeWidth / 2 * fill.scaleX)
        stroke.left = fill.left - (stroke.strokeWidth / 2 * fill.scaleY)
    }

    styleBothLayers = (wantedFillStyle, wantedStrokeStyle) => {
        const { fillStyle, strokeStyle } = this.state;
        const finalStrokeStyle = wantedStrokeStyle || wantedFillStyle;

        this.setState({
            fillStyle: {
                ...fillStyle,
                ...wantedFillStyle
            },

            strokeStyle: {
                ...strokeStyle,
                ...finalStrokeStyle
            }
        }, () => {
            this.matchStyleToState();
        });


    }

    matchStyleToState = () => {
        this.state.fillTextBox.set({...this.state.fillStyle});
        this.state.strokeTextBox.set({...this.state.strokeStyle});
        this.setStrokeLayerPos(this.state.fillTextBox, this.state.strokeTextBox)
        this.props.canvas.renderAll();
    }


    handleAction = (action) => {

        switch(action) {
            case 'remove' : {
                if(_.isFunction(this.props.remove)) {
                    this.props.remove(this.props.id);
                }
                break;
            }

            case 'alignTextCenter': {
                this.styleBothLayers({ 'textAlign': 'center' });
                document.getElementById('c').dir='rtl';
                break;
            }

            case 'alignTextRight': {
                this.styleBothLayers({ 'textAlign': 'right' });
                document.getElementById('c').dir='rtl';
                break;
            }

            case 'alignTextLeft': {
                this.styleBothLayers({ 'textAlign': 'left' });
                document.getElementById('c').dir='ltr';
                break;
            }

            case 'makeFontSmaller': {
                const currentFont = parseInt(this.state.fillStyle.fontSize);
                this.styleBothLayers({ 'fontSize': (currentFont - 3) });
                break;
            }

            case 'makeFontLarger': {
                const currentFont = parseInt(this.state.fillStyle.fontSize);
                this.styleBothLayers({'fontSize' : (currentFont + 3)});
                break;
            }

            case 'makeFontBold': {
                this.styleBothLayers({'fontFamily': 'impacta_oebold, impact', opacity: 1});
                break;
            }

            case 'makeFontLight': {
                this.styleBothLayers({ 'fontFamily': 'Open Sans Hebrew', fontWeight: 100 });
                break;
            }

            case 'toggleTextColor': {
                const currentColor = this.state.fillStyle.fill;
                const wantedColor = ((currentColor === colors.BLACK ) ? colors.WHITE : colors.BLACK);
                this.styleBothLayers({'fill': wantedColor, shadow: 0}, {...this.state.strokeStyle, opacity: 0});


                break;
            }

            case 'makeFontWhite': {
                this.styleBothLayers({
                        fill: colors.WHITE ,
                        shadow: constants.fillStyle.shadow,
                        fontFamily: constants.fillStyle.fontFamily,
                        fontWeight: 700
                    }, {...this.state.strokeStyle, opacity: 1 });
                break;
            }

            case 'makeFontBlack': {
                this.styleBothLayers({'fill': colors.BLACK, shadow: 0 , 'fontFamily': 'Open Sans Hebrew', fontWeight: 100 }, {...this.state.strokeStyle, opacity: 0});
                break;
            }
        }

        this.props.canvas.renderAll();
    }

    render() {

        const { isFocused, fillStyle, textValue } = this.state;

        return (

            <div className={classNames({ 'focused': isFocused }, 'box-meme-text-field clearfix')}>

                <FormControl
                    placeholder={'טקסט'}
                    value={textValue}
                    onChange={event => this.onInputChange(event)}
                    type='text'
                    theme="bottom-flat"
                    className={'input-lg'}
                    id={Math.random()}
                    componentClass="textarea"
                    onFocus={() => this.setState({ isFocused: true })}
                    onBlur={() => this.setState({ isFocused: false })}
                    dir="rtl"
                />


                <MemeTextFieldButtons currentColor={fillStyle.fill} handleAction={this.handleAction} />

            </div>
        )
    }
}



