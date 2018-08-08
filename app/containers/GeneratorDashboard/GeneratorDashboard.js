import _ from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'
import config from 'config/config'
import { withRouter } from 'react-router'

// components
import Button from 'components/Button/Button'
import ItemsArea from 'components/ItemsArea/ItemsArea'
import TextFieldsContainer from 'components/TextFieldsContainer/TextFieldsContainer'
import GeneratorSignature from 'components/GeneratorSignature/GeneratorSignature'
import Modal from 'components/Modal/Modal'
import Icon from 'components/Icon/Icon'
import Col from 'react-bootstrap/lib/Col'
import GeneratorDashboardSkeleton from 'containers/GeneratorDashboard/DashboardSkeleton'
import MemeSuggestionsContainer from 'containers/MemeSuggestionsContainer/MemeSuggestionsContainer'

// services
import AnalyticsService from 'services/Analytics'
import WebViewService from 'services/webViewService'

// helpers
import helpers from 'helpers/helpers'
import {
    addImageAsync,
    createCollage,
    getCanvasContainerWidth,
    isDataURL
} from 'containers/Generator/generator-helpers'

// constants
import globalConstants from 'constants/global'
import dashboardConstants from './dashboard-constants';

const Buttons = ({ className, canvas, isCleanSlateState, format, actions, isDownloadLoading }) =>  (
    <div className={classNames("buttons-container", className)}>

        {_.map(_.values(dashboardConstants.buttons), (button) => {
            return (
                button.show({ isCleanSlateState }) && (
                    <Col
                        className={'button-wrapper padding-right-none padding-left-none'}
                        xs={1}
                        sm={6}
                    >
                        <Button
                            onClick={actions[button.onClick]}
                            onDrop={actions[button.onDrop]}
                            block
                            multiple
                            isLoading={button.getLoadingState({ isDownloadLoading })}
                            bsStyle="brand-gray-border"
                            className="flex space-between dashboard-button weight-600"
                            componentClass={button.componentClass}
                        >
                            <Icon className="margin-right-small" name={button.icon}/>
                            <span className="dashboard-button-label">{button.getLabel({ format })}</span>
                        </Button>
                    </Col>
                )
            )
        })}

    </div>
)



class GeneratorDashboard extends Component {

    state = {
        isItemsAreaOpen: false,
        isDownloadLoading: false
    }

    download = () => {
        const { canvas, saveUserMemeToStorage, format, meme, isCollageMode, isCleanSlateState, updateMemeRating } = this.props;

        helpers.sendDownloadedMemeAnalyticsEvent({ format, meme })

        canvas.deactivateAll().renderAll()

        //saveing the canvas and resizing it before downloading depends on screen resolution.
        const zoom = helpers.isMobile() ? 2.5 : 1.3

        canvas.setZoom(zoom)

        // need to enlarge canvas otherwise the svg will be clipped
        canvas.setWidth(canvas.getWidth() * zoom).setHeight(canvas.getHeight() * zoom)


        const isDesktop = !helpers.isMobile()

        const memeData = {
            urlPath: canvas.toDataURL(),
            date: new Date(),
            description: _.get(meme, 'description'),
            isMobile: !!helpers.isMobile(),
            isMobileApp: !!WebViewService.isWebView,
            isDesktop: !!isDesktop
        }


        if (WebViewService.isWebView) {
            this.handleSaveToWebView({ memeData, zoom })
            return
        }

        saveUserMemeToStorage(memeData)


        const link = document.createElement("a")
        link.href = canvas.toDataURL()
        link.download = 'MemeKing'
        link.click()
        console.log(canvas.toDataURL())

        if (!isCleanSlateState && !isDataURL(_.get(this.props, 'meme.urlPath')) && !isCollageMode) {
            updateMemeRating(this.props.meme)
        }

        //!* need to set back canvas dimensions *
        canvas.setWidth(canvas.getWidth() / zoom).setHeight(canvas.getHeight() / zoom)
        canvas.setZoom(1)

    }

    handleSaveToWebView = ({ memeData, zoom }) => {

        const { saveUserMemeToStorage, format, meme, isCollageMode, canvas } = this.props;

        //!* need to set back canvas dimensions *
        canvas.setWidth(canvas.getWidth() / zoom).setHeight(canvas.getHeight() / zoom);
        canvas.setZoom(1);

        helpers.sendDownloadedMemeAnalyticsEvent({ isMobileApp: true, format, meme, isCollageMode });

        if (WebViewService.isAndroid) {

            this.setState({ isDownloadLoading: true });

            saveUserMemeToStorage(memeData).then(response => {

                this.setState({ isDownloadLoading: false });

                window.postMessage(response.payload.data)
            });
        } else {
            window.postMessage(memeData.urlPath)
            saveUserMemeToStorage(memeData)
        }
    }

    uploadFiles = acceptedFiles => {

        const { canvas } = this.props


        _.forEach(acceptedFiles, file => {

            const randomX = (Math.floor(Math.random() * canvas.width) + 1) / 2
            const randomY = (Math.floor(Math.random() * canvas.height) + 1) / 2

            fabric.Image.fromURL(file.preview, function (image) {
                image = helpers.modifyImageDimensions({ image, wantedMaxHeight: 100 })
                image.left = randomX
                image.top = randomY
                canvas.add(image)
                image.set({ hoverCursor: "default" })
                image.lockMovementX = false
                image.lockMovementY = false
                image.hasBorders = true
                image.selectable = true
                canvas.bringForward(image)

            })
        })
    }


    sendImageToCropper = () => {

        AnalyticsService.sendEvent('Cropping from inside Generator')

        const { canvas, setUploadImage, meme = {} } = this.props

        canvas.deactivateAll().renderAll()

        const memeId = meme.id

        setUploadImage({ urlPath: canvas.toDataURL(), id: memeId }).then(() => {
            this.props.activateCropper()
        })
    }

    changeFormat = () => {

        const { history, format, location } = this.props
        const wantedFormat = (format === globalConstants.format.normal) ? globalConstants.format.dank : globalConstants.format.normal
        const wantedPath = location.pathname.replace(format, wantedFormat)

        history.push(wantedPath)
    }

    render() {

        const { format, canvas, style, isCleanSlateState, isLoading, isUpload, closeGenerator } = this.props
        const { isDownloadLoading } = this.state;

        if (isLoading) {

            return (
                <GeneratorDashboardSkeleton style={style}/>
            )
        }

        const buttons = (
            <Buttons
                canvas={canvas}
                isCleanSlateState={isCleanSlateState}
                format={format}
                isDownloadLoading={isDownloadLoading}
                actions={{
                    closeGenerator: closeGenerator,
                    download: this.download,
                    uploadFiles: this.uploadFiles,
                    addTextLine: () => this.TextFieldsContainer.addTextInput(),
                    changeFormat: this.changeFormat,
                    toggleItemsArea: () => this.setState({ isItemsAreaOpen: !this.state.isItemsAreaOpen }),
                    sendImageToCropper: this.sendImageToCropper
                }}
            />
        )

        return (
            <div style={style} className="box-generator-dashboard">

                {helpers.isMobile() && buttons}

                <TextFieldsContainer
                    ref={ elem => this.TextFieldsContainer = elem}
                    canvas={canvas}
                    format={format}
                />

                {!helpers.isMobile() && buttons}

                {(helpers.isMobile() && !isUpload && !isCleanSlateState) && <MemeSuggestionsContainer />}

                <GeneratorSignature className="visible-mobile"/>

                <Modal
                    onHide={() => this.setState({ isItemsAreaOpen: false })}
                    show={this.state.isItemsAreaOpen && canvas}
                >

                    <Modal.CloseButton onClick={() => this.setState({ isItemsAreaOpen: false })} />
                    <ItemsArea
                        canvas={canvas}
                        closeModal={() => this.setState({ isItemsAreaOpen: false })}
                    />
                </Modal>

            </div>
        )
    }
}


export default withRouter(GeneratorDashboard)
