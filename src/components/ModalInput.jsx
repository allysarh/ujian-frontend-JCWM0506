import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Toast, ToastBody, ToastHeader } from 'reactstrap'
import { URL_API } from '../helper';

class ModalInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notif: false,
            produk: []
        }
    }
    componentDidMount() {
        this.getDataProduk()
    }

    getDataProduk = () => {
        axios.get(URL_API + `/products`)
            .then((res) => {
                console.log("respon data get produk", res.data)
                this.setState({ produk: res.data })
            })
            .catch(err => console.log("error get data", err))
    }
    printToast = () => {
        <div className="p-3 my-2 rounded">
            <Toast>
                <ToastHeader>
                    Add to cart
                </ToastHeader>
                <ToastBody>
                    Berhasil!
                </ToastBody>
            </Toast>
        </div>
    }
    onBtnAdd = () => {
        // if(this.state.produk.stock < this.inQty.value){
        //     console.log(this.props.stok)
        let inQty = this.inQty.value
        let type = this.props.nama
        let cart = [
            {
                qty: inQty,
                type: type
            }
        ]

        this.props.cart.push({
            qty: parseInt(inQty),
            name: type

        })

        let arr = [...this.props.cart]
        let merged = arr.reduce((acc, cur) => {
            let name = cur.name
            let found = acc.find((elem) => {
                if (elem.name === name) {
                    return name
                }
            });
            if (found) {
                // console.log("found",found)
                found.qty += cur.qty;
            } else {
                acc.push(cur);
            }
            return acc;
        }, []);
        console.log(merged)
        axios.patch(URL_API + `/users/${this.props.id}`, {
            cart: merged
        })
            .then((res) => {
                alert("berhasil masuk cart!")
                console.log("berhasil post", res.data)
                this.setState({ notif: !this.state.notif })
                this.props.toggle()
            })
            .catch(err => console.log("err post data", err))

            this.props.cart.forEach((item, index) =>{
                this.state.produk.forEach((value, idx)=>{
                    if(item.name === value.name){
                        if(item.qty < value.stock){
                            value.stock -= item.qty
                            axios.patch(URL_API + `/products/${idx+1}`, {
                                stock: value.stock
                            })
                            .then((res) =>{
                                console.log("respon patch produk", res.data)
                                this.getDataProduk()
                            }).catch(err => console.log(err))
                        } else {
                            alert("stok tidak cukup!")
                        }
                    }
                })
                
            })
        // } else {
        //     alert("stok tidak cukup")
        // }



    }
    render() {
        return (
            <>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.toggle}>Masukkan {this.props.nama} ke Keranjang!</ModalHeader>
                    <ModalBody>
                        <Label>
                            Jumlah yang diinginkan:
                        </Label>
                        <Input type="number" innerRef={element => this.inQty = element} defaultValue={1} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onBtnAdd}>Add</Button>{' '}
                    </ModalFooter>
                    {
                        this.state.notif &&
                        this.printToast()
                    }
                </Modal>
            </>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        cart: authReducer.cart
    }
}
export default connect(mapStateToProps)(ModalInput);