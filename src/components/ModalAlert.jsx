import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class ModalAlert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Anda belum login! Silahkan login terlebih dahulu.
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/login">
                            <Button color="primary" onClick={this.props.toggle}>Login</Button>{' '}
                        </Link>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default ModalAlert;