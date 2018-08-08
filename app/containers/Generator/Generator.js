import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import GeneratorDashboard from 'containers/GeneratorDashboard/GeneratorDashboard';
import GeneratorSignature from 'components/GeneratorSignature/GeneratorSignature';
import GeneratorModal from 'components/GeneratorModal/GeneratorModal';
import Canvas from 'components/Canvas/Canvas';
import Col from 'react-bootstrap/lib/Col';
import Title from 'components/Title/Title';
import MemeSuggestionsContainer from 'containers/MemeSuggestionsContainer/MemeSuggestionsContainer';
import Cropper from 'components/Cropper/Cropper';;

// helpers
import helpers from 'helpers/helpers';
import { addImageAsync, createCollage, getCanvasContainerWidth } from './generator-helpers';

// constants
import colors from 'constants/colors';
import globalConstants from 'constants/global';
import generatorConstants from './generator-constants';

// services
import WebViewService from 'services/webViewService';

// actions
import { updateMemeRating, saveUserMemeToStorage } from 'actions/meme-actions/meme-actions';
import { fetchSingleMeme } from 'actions/category-actions/category-actions';
import { fetchMemeSuggestions } from 'actions/suggestions-actions/suggestions-actions';
import { setUploadImage, clearUploadedImages } from 'actions/upload-actions/upload-actions';
import { setCollageMode } from 'actions/collage-actions/collage-actions';

class Generator extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
            canvas: null,
            canvasHeight: '240px',
            isCropMode: props.type === 'cropper'
        }
    }

    componentDidMount() {

        const { isStandAlone, fetchSingleMeme, memeId } = this.props;

        if (isStandAlone) {
            fetchSingleMeme(memeId);
        }

    }
    componentWillReceiveProps(nextProps) {

        const { format, isCleanSlateState, meme } = this.props;

        if (nextProps.isCleanSlateState || isCleanSlateState) {
            return;
        }

        if ((format !== nextProps.format) || (meme !== nextProps.meme)) {

            this.setState({ isLoading: true }, () => {
                this.addImage(nextProps.format);
            })
        }

    }

    createCleanSlate = () => {

        const { canvas } = this.state;

        const DISTANCE = helpers.isMobile() ? 30 : 140;
        const mobileHeight = generatorConstants.cleanSlate.MOBILE_HEIGHT;
        const width = helpers.isMobile() ? 300 : _.get(document.querySelector('.generator__canvas-wrapper'), 'offsetWidth') - DISTANCE;
        const height = helpers.isMobile() ? mobileHeight : 460;

        canvas.backgroundColor = colors.WHITE;
        canvas.setWidth(width);
        canvas.setHeight(height);

        this.addWaterMark();
        this.setState({ isLoading: false, canvasHeight: `${mobileHeight}px` });

    }

    addWaterMark = () => {

        const { isWebView } = this.props;
        const { canvas } = this.state;

        const isMobile = helpers.isMobile();

        helpers.addWaterMark({ isMobile, canvas, isWebView });

    }

    addImage = (format) => {

        const { meme } = this.props;
        const { urlPath } = meme || {};
        const { canvas } = this.state;

        if (!canvas) {
            return;
        }


        canvas.backgroundColor = colors.WHITE;
        const isNormalFormat = (format === globalConstants.format.normal);
        const formatData = _.get(generatorConstants, ['formats', format]);

        const canvasContainerWidth = getCanvasContainerWidth();

        canvas.setWidth(canvasContainerWidth);
        canvas.clear();


        addImageAsync({ image: urlPath }).then(image => {

            if (!image) {
                return;
            }

            const wantedMaxHeight = formatData.image.getWantedMaxHeight()
            const wantedMaxWidth = formatData.image.getWantedMaxWidth()

            image = helpers.modifyImageDimensions({ image, wantedMaxHeight, wantedMaxWidth, isNormalFormat })

            canvas.setHeight(formatData.board.getHeight(image))
            canvas.setWidth(formatData.board.getWidth(image))

            canvas.add(image)

            image.set(formatData.image.style)

            this.setState({ isLoading: false, canvasHeight: `${canvas.height}px` })

            if (format !== 'dankFormat') {
                this.addWaterMark();
            }

        })

    }

    closeGenerator = () => {
        const { isCollageMode, history, setCollageMode, backgroundCategory, clearUploadedImages } = this.props

        if (isCollageMode) {
            setCollageMode({ isCollageMode: false })
        }

        clearUploadedImages();

        if (backgroundCategory) {
            history.push(`/memes/${backgroundCategory}`);
        } else {
            history.goBack();
        }
    }

    setCanvas = canvas => {

        const { isCollageMode, collageMemes, isCleanSlateState, format } = this.props

        this.setState({ canvas }, () => {

            if (isCollageMode) {

                createCollage({
                    collageMemes,
                    addWaterMark: this.addWaterMark,
                    canvas,
                    callback: canvas => this.setState({ isLoading: false, canvasHeight: `${canvas.height}px` })
                })

            } else if (isCleanSlateState) {

                this.setState({ isLoading: true }, () => {
                    this.createCleanSlate();
                })

            } else {

                this.addImage(format);

            }
        })
    }

    render() {

        const { isLoading, canvas, canvasHeight, isCropMode } = this.state;

        const {
            meme,
            format,
            history,
            location,
            saveUserMemeToStorage,
            isCleanSlateState,
            isWebView,
            isCollageMode,
            setUploadImage,
            category,
            isUpload,
            updateMemeRating
        } = this.props

        const dashboardStyle = { top: helpers.isMobile() ? canvasHeight : null };

        return (
            <GeneratorModal onClose={this.closeGenerator} className="generator">

                {(!isWebView && !helpers.isMobile()) && (<GeneratorModal.CloseButton onClick={this.closeGenerator}/>)}

                {
                    isCropMode
                    
                        ?
                        <Cropper
                            onClose={() => this.setState({ isCropMode: false })}
                        />
                        :
                        <span>
                            
                            {!helpers.isMobile() && (
                                <span>
                                    <Title theme="black" className="text-center margin-bottom-small" direction="rtl">
                                        מחולל הממים
                                    </Title>
                                    <Title theme="black" italic size="h4" className="text-center margin-bottom-medium" direction="rtl">
                                        {_.toUpper(_.get(meme, 'description'))}
                                    </Title>
                                </span>
                            )}
                            <div className="generator__wrapper">

                                <Col lg={7} md={12}>
                                    <Canvas
                                        setCanvas={this.setCanvas}
                                        isLoading={isLoading}
                                        ref={node => this.canvasWrapper = node}
                                    />
                                </Col>

                                <Col sm={12} lg={5}>
                                    <GeneratorDashboard
                                        history={history}
                                        style={dashboardStyle}
                                        setUploadImage={setUploadImage}
                                        isLoading={isLoading}
                                        saveUserMemeToStorage={saveUserMemeToStorage}
                                        location={location}
                                        closeGenerator={this.closeGenerator}
                                        meme={meme}
                                        isCollageMode={isCollageMode}
                                        isCleanSlateState={isCleanSlateState}
                                        format={format}
                                        activateCropper={() => this.setState({ isCropMode: true })}
                                        canvas={canvas}
                                        isUpload={isUpload}
                                        updateMemeRating={updateMemeRating}
                                    />
                                </Col>

                            </div>

                            {(!helpers.isMobile() && !isUpload && !isCleanSlateState) &&
                            <MemeSuggestionsContainer category={category}/>}
                        </span>
                }


                <GeneratorSignature className="hidden-xs"/>

            </GeneratorModal>
        )

    }
}


function mapStateToProps(state, ownProps) {

    const { match: { params }, location, history } = ownProps

    const memeId = params.id;
    const type = params.type;
    const user = _.get(state, 'auth.user')

    const uploadedImages = _.get(state, 'upload.images');

    const currentMemeObj =  uploadedImages[memeId] || state.category.memes[memeId] || state.search.searchResults[memeId] || _.find(_.get(user, 'personalMemes'), { id: memeId }) ;
    return {
        category: _.get(currentMemeObj, 'category'),
        meme: currentMemeObj,
        format: params.format || 'normalFormat',
        type,
        memeId: memeId,
        isStandAlone: type === 'standalone',
        history,
        location,
        isCollageMode: type === 'collage',
        isWebView: WebViewService.isWebView,
        isCleanSlateState: (type === 'clean-slate'),
        suggestions: _.get(state, 'suggestions.memes'),
        collageMemes: _.get(state, 'collage.memes', {})
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {

    const { category } = _.get(stateProps, 'meme') || {}

    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        fetchMemeSuggestions: () => dispatchProps.fetchMemeSuggestions(category, helpers.isMobile() ? 3 : 6)

    }
}

export default connect(mapStateToProps, {
    fetchSingleMeme,
    setUploadImage,
    saveUserMemeToStorage,
    setCollageMode,
    clearUploadedImages,
    updateMemeRating,
    fetchMemeSuggestions
}, mergeProps)(Generator)