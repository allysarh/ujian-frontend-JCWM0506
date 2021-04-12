import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { URL_API } from '../helper';
import { authLogin } from '../actions'
import { Redirect } from 'react-router';

class ModalKonfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    onBtnKonfirm = () => {
        let email = this.props.email
        let cart = this.props.cart
        let status = "belum dibayar"

        console.log(email, cart, status)
        axios.post(URL_API + `/transactions`, {
            email, cart, status
        }).then((res) => {
            console.log("data transaksi", res.data)
            this.setState({ redirect: !this.state.redirect })
        }).catch(err => console.log("error post transaksi", err))

        let cartReset = []

        axios.patch(URL_API + `/users/${this.props.id}`, {
            cart: cartReset
        }).then((res) =>{
            console.log("respon reset data cart", res.data)
        }).catch(err => console.log(err))


    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/history" />
        } else {
            return (
                <>
                    <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                        <ModalHeader toggle={this.toggle}>Masukkan {this.props.nama} ke Keranjang!</ModalHeader>
                        <ModalBody>
                            Anda akan melakukan check out. Konfirmasi?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onBtnKonfirm}>Konfirmasi</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </>
            );
        }
    }
}
const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        cart: authReducer.cart,
        email: authReducer.email
    }
}

export default connect(mapStateToProps, { authLogin })(ModalKonfirm);