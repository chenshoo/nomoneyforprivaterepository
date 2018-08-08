import React from 'react';

// components
import Searcher from 'containers/Searcher/Searcher';

class SearchContainer extends React.Component {


    render() {

        return(
            <div className="search-container">
                <Searcher className="margin-left-small margin-right-small margin-top-small margin-bottom-large" />
            </div>
        )
    }
}

export default SearchContainer