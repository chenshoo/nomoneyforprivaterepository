import React from 'react';
import classNames from 'classnames';
import GeneratorModal from 'components/GeneratorModal/GeneratorModal'

// components
import Modal from 'react-bootstrap/lib/Modal';
import Icon from 'components/Icon/Icon';

const MyModal = ({ children, show, className, onHide }) => (
    <Modal className={classNames("memeking-modal",className)} show={show} onHide={onHide} >
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>
)

MyModal.CloseButton = ({ ...rest}) => <Icon {...rest} name="REMOVE" className="close-button" />

export default MyModal;