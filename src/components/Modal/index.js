import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { CLOSE_MODAL } from '../../reducers/DOM/actions'

const ModalComponent = () => {
    const { modal } = useSelector(state => state.DOM)
    const dispatch = useDispatch()

    const handleOnClose = () => dispatch(CLOSE_MODAL());

    return (
        <Modal
            show={modal.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleOnClose}
        >
            {
                modal.header &&
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {modal.header}
                    </Modal.Title>
                </Modal.Header>
            }
            <Modal.Body>
                {modal.body}
            </Modal.Body>
            <Modal.Footer>
                {modal.footer}
                <Button onClick={handleOnClose} size="sm">Cerrar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalComponent
