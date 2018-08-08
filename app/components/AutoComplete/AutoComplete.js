import React from 'react';
import classNames from 'classnames';

// components
import ReactSelect from 'react-select';



class AutoComplete extends React.Component {



    render() {

        const { className, ...rest } = this.props;

        return (
            <ReactSelect
                className={classNames('box-auto-complete', className)}
                {...rest}
            />
        )
    }
}

AutoComplete.Async = ({ className, ...rest }) => {

    return (
        <ReactSelect.Async
            className={classNames('box-auto-complete', className)}
            {...rest}
        />
    )
}


export default AutoComplete;