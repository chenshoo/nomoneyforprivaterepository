import _ from 'lodash';
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom';
import Transition from 'components/Transition/Transition'

// actions
import {fetchSearchResults, cleanSearchResults} from 'actions/search-actions/search-actions'

// components
import AutoComplete from 'components/AutoComplete/AutoComplete';
import Text from 'components/Text/Text';
import Avatar from 'components/Avatar/Avatar';
import FormControl from 'components/FormControl/FormControl';
import Panel from 'components/Panel/Panel';
import MemeThumb from 'components/MemeThumb/MemeThumb'
import Icon from 'components/Icon/Icon'
import Title from 'components/Title/Title'
import SpinnerDots from 'components/SpinnerDots/SpinnerDots';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

// constants
import globalConstants from 'constants/global'

// helpers
import helpers from 'helpers/helpers';

// assets
import notFoundImage from 'assets/images/search-404.png';
import xavier from 'assets/images/xavier-404.png';

// services
import AnalyticsService from 'services/Analytics';

class Searcher extends Component {

    state = {
        value: '',
        displayValue: '',
        isOpen: false
    }

    clearResults = () => {
        this.setState({ value: '', displayValue: '', isOpen: false })
        this.props.cleanSearchResults();
    }

    isOpenGenerator = (meme) => {
        const { history } = this.props;
        history.push(`/generator/search/${meme.id}/${globalConstants.format.normal}`);
    };

    onSearch = (e) => {


        const value = _.get(e, 'target.value') || '';

        this.setState({ displayValue: value });

        if (!value) {
            this.setState({ value: '', displayValue: '' })
            this.props.cleanSearchResults();
            return
        }

        this.setState({ isOpen: true });

        if (value.length >= 3) {
            AnalyticsService.sendEvent('Search happened', value);
            this.fetchResults();
        }
    };

    fetchResults = _.debounce((value) => {

        this.setState({ value: this.state.displayValue }, () => {
            const { value } = this.state;
            this.props.fetchSearchResults(value);
        });


    }, 300);


    onBlur = () => {

        const { searchResults } = this.props;

        if (_.isEmpty(searchResults)) {
            this.clearResults();
        };


    }

    onFocus = () => {
        this.setState({ isOpen: true });
    }

    componentDidUpdate( prevProps, prevState) {
        if(this.state.isOpen !== prevState.isOpen) {
            document.querySelector('.cover').style.display = this.state.isOpen ? 'block' : 'none';
        }
    }



    render() {

        const { className, searchResults, isFetching } = this.props;
        const { value, displayValue, isOpen } = this.state;

        const foundNoResults = _.isEmpty(searchResults) && _.size(value) > 2 && !isFetching;

        return (

            <div className={classNames('box-searcher', className)}>
                <div className="input-container">
                    <Icon
                        onClick={this.clearResults}
                        className="search-icon clickable"
                        name={isOpen ? 'REMOVE' : 'SEARCH'}
                        theme="main-brand"
                        size="xxl"
                    />
                    <FormControl
                        placeholder="חיפוש מימז"
                        bsSize="xl"
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        theme="shadow"
                        value={displayValue}
                        onChange={this.onSearch}
                    />
                </div>
                {isOpen && (
                    <Transition name="slide-down">
                        <Panel theme="shadow" className="margin-top-small search-result-component text-center">

                            {
                                !isFetching && !foundNoResults && _.isEmpty(searchResults)
                                    ?
                                    <img src={xavier} className="center-block img-responsive empty-state-img" />
                                    :
                                    isFetching
                                        ?
                                        <SpinnerDots size="lg" className="margin-top-medium" />
                                        :
                                        foundNoResults
                                            ?
                                            <img src={notFoundImage} className="center-block img-responsive empty-state-img" />
                                            :
                                            <Row className="padding-right-small padding-left-small">
                                                {_.map(searchResults, meme => {
                                                    return (
                                                        <Col xs={6} sm={2} className="padding-right-none padding-left-none">
                                                            <MemeThumb
                                                                theme="full-width"
                                                                to={`/generator/search/${meme.id}/${globalConstants.format.normal}`}
                                                                {...meme}
                                                            />
                                                        </Col>
                                                    )
                                                })}
                                            </Row>


                            }
                        </Panel>

                    </Transition>
                )}
            </div>
        )

    }
}

function mapStateToProps(state, ownProps) {

    return {
        searchResults: state.search.searchResults,
        isFetching: state.search.isFetching,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchSearchResults, cleanSearchResults }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Searcher))