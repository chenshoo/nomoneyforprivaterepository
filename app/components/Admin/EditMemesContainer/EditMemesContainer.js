/**
 * Created by nirbenya on 18/04/2018.
 */
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import Editor from 'components/Admin/Editor/Editor';

// helpers
import { blobToString } from 'containers/Generator/generator-helpers';
import helpers from 'helpers/helpers';

// actions
import { saveNewMeme, saveEditedMeme } from 'actions/admin-actions/admin-actions';
import { fetchCategory } from 'actions/category-actions/category-actions'

// constants
import constants from 'constants/global'
import menu from 'constants/menu';

// components
import Title from 'components/Title/Title'

class NewMemesContainer extends React.Component {

    state = {
        category: 'home'
    }

    onCategoryChange = event => {
        this.setState({ category: event.target.value })
        this.props.fetchCategory(event.target.value)
    }

    render() {
        const { category } = this.props;
        const categories = { 'select category': {title : 'Select Category'}, ...menu };

        return(
            <div>
                <div>
                    <select value={this.state.category} onChange={this.onCategoryChange}>
                        {_.map(categories, (value, prop) => {
                            return <option key={_.uniqueId()}>{prop}</option>
                        })}
                    </select>
                </div>

                <Title>({_.size(category)})</Title>

                {_.map(category, meme => (
                    <Editor
                        meme={meme}
                        index={meme.id}
                        saveMeme={this.props.saveEditedMeme}
                    />
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
   return {
       category: _.get(state, 'category.memes')
   }
}

function mapDispatchToProps(dispatch) {

    return {
        fetchCategory: (category) => dispatch(fetchCategory(category)),
        saveEditedMeme: meme => dispatch(saveEditedMeme(meme))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(NewMemesContainer);