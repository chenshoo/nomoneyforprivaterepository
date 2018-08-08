import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// actions
import { fetchMemeSuggestions } from 'actions/suggestions-actions/suggestions-actions';
import { addMemeToCategory } from 'actions/category-actions/category-actions';

// components
import MemeThumb from 'components/MemeThumb/MemeThumb';
import Row from 'react-bootstrap/lib/Row';
import Label from 'components/Label/Label'

// helpers
import helpers from 'helpers/helpers';

// services
import AnalyticsService from 'services/Analytics';

class MemeSuggestionsContainer extends Component {

    componentDidMount() {
        const { category, fetchMemeSuggestions } = this.props;

        if (category) {
            fetchMemeSuggestions(category)
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.category !== nextProps.category && nextProps.category) || (this.props.memeId !== nextProps.memeId && nextProps.memeId)) {
            this.props.fetchMemeSuggestions(nextProps.category)
        }
    }


    openGenerator = (e, meme) => {

        const { location = {}, memeId: currentMemeId, addMemeToCategory, history } = this.props;

        e.preventDefault();

        AnalyticsService.sendEvent('Similar Memes Clicked');

        addMemeToCategory(meme).then(() => {
            history.push(_.replace(_.get(location, 'pathname'), currentMemeId, meme.id ))
        })

    };

    render() {

        const { suggestions, isFetching, category } = this.props;


        if (!category || _.isEmpty(suggestions)) {
            return null;
        }

        return(

                <Row className="box-meme-suggestions-container margin-top-medium">
                    <Label size={helpers.isMobile() ? 'sm' : 'md'} theme="default">
                        ממים דומים
                    </Label>
                    {_.map(suggestions, (meme) =>
                        <MemeThumb
                            width={helpers.isMobile() ? 33 : 12.5}
                            key={meme.id}
                            {...meme}
                            to={''}
                            onClick={e => this.openGenerator(e, meme)}
                            className="margin-right-tiny margin-left-tiny"
                        />
                    )}
                </Row>
        )
    }

}

function mapStateToProps(state, ownProps) {

    const memeId = _.get(ownProps, 'match.params.id');

    return {
        suggestions: _.get(state, 'suggestions.memes') || {},
        category: _.get(state, ['category', 'memes', memeId, 'category' ]) ||
                  _.get(state, ['search', 'searchResults', memeId, 'category' ]) ||
                  _.get(ownProps, 'category'),
        memeId,
        format: _.get(ownProps, 'match.params.format')
    }
}

export default withRouter(connect(mapStateToProps, { addMemeToCategory, fetchMemeSuggestions })(MemeSuggestionsContainer));