import React from 'react'
import classNames from 'classnames'

// components
import Icon from 'components/Icon/Icon'
import PopupCover from 'components/PopupCover/PopupCover'

const GeneratorModal = ({ children, className, onClose }) => (
    <PopupCover onClick={onClose}>
        <div className={classNames('box-generator-modal', className)} onClick={(e) => {e.stopPropagation()}}>
            {children}
        </div>
    </PopupCover>
)

GeneratorModal.CloseButton = ({ onClick, theme }) => (
    <Icon name="REMOVE" onClick={onClick} className={classNames('box-generator-modal__close', theme)}/>
)

export default GeneratorModal