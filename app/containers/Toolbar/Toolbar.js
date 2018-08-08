import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// components
import Icon from 'components/Icon/Icon';
import Tooltip from 'components/Tooltip/Tooltip';

 // actions
import { setCollageMode, resetCollageMemes } from 'actions/collage-actions/collage-actions';

// helpers
import helpers from 'helpers/helpers';

class Toolbar extends React.Component {

    openCollageGenerator = () => {

        const { history, match } = this.props;

        history.push(`${match.url}/generator/collage/collage-meme/normalFormat`);
    }

    render() {
        const { collageMemeAmount, setCollageMode, isCollageMode } = this.props;
        const amountToShowCollageExtra = (collageMemeAmount > 1);
        const iconSize = helpers.isMobile() ? 'xl' : 'xxl';

        return (
            <div className="box-toolbar">
                <Tooltip placement="right" text="בחירת ממים לקולאז׳">
                    <span>
                        <Icon
                            size={iconSize}
                            name="IMAGES"
                            theme={isCollageMode ? 'pink-dark': 'pink'}
                            onClick={setCollageMode}
                        />
                    </span>
                </Tooltip>
                {amountToShowCollageExtra && (
                    <Tooltip placement="right" text="הכנת הקולאז׳">
                        <span>
                            <Icon
                                onClick={this.openCollageGenerator}
                                className="open-generator margin-top-small"
                                size={'xl'}
                                theme="pink"
                                name={'NEW_WINDOW'}
                            />
                        </span>
                    </Tooltip>
                )}
                {amountToShowCollageExtra && (
                    <Tooltip placement="right" text="איפוס ממים לקולאז׳">
                        <span>
                            <Icon
                                onClick={this.props.resetCollageMemes}
                                className="clean-collage margin-top-small"
                                size={'xl'}
                                theme="pink"
                                name="TRASH"
                            />
                        </span>
                    </Tooltip>
                )}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isCollageMode: state.collage.isCollageMode,
        collageMemeAmount: _.size(state.collage.memes),
        collageMemeLimit: state.collage.limit,
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        setCollageMode: () =>  {

            return dispatchProps.setCollageMode({ isCollageMode: !stateProps.isCollageMode })
        }

    }
}

export default withRouter(connect(mapStateToProps, { setCollageMode, resetCollageMemes }, mergeProps)(Toolbar))