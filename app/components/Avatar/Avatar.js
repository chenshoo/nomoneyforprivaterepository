import React, { Component } from 'react';
import classNames from 'classnames';

// assets
import logo from 'assets/images/logo.png';

 class Avatar extends Component {



    render() {
        const { imgSrc, size, isCentered, className, block } = this.props;

        return(
            <div className={classNames('box-avatar', `size-${size}`, {'center': isCentered}, {'block': block }, className)}>
                <img src={imgSrc} />
            </div>
        )
    }

}

Avatar.defaultProps = {
    imgSrc: logo,
    size: 'md',
    block: false
}

export default Avatar;