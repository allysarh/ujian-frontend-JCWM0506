import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Button, Container, Table, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { URL_API } from '../helper';
import { authLogin } from '../actions'
import ModalAlert from '../components/ModalAlert';
import ModalKonfirm from '../components/ModalKonfirm';

class UserCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produk: [],
            modal: false
        }
    }

    // componentDidMount() {
    //     this.getDataProduk()
    // }

    // getDataProduk = () => {
    //     console.log("name",this.props.cart[0].name)
    //     axios.get(URL_API + `/products/?name=${this.props.cart[0].name}`)
    //         .then((res) => {
    //             console.log("respon data get produk", res.data[0])
    //             this.setState({ produkStok: res.data[0].stock })
    //         })
    //         .catch(err => console.log("error get data", err))
    // }

    onBtnDelete = (index) => {
        this.props.cart.splice(index, 1)
        // console.log("delete",this.props.cart)
        axios.patch(URL_API + `/users/${this.props.id}`, {
            cart: this.props.cart
        })
            .then((res) => {
                console.log("respon data delete", res.data)
                this.props.authLogin(res.data)
            })
            .catch(err => console.log(err))
    }

    onBtnIncrement = (index, nama) => {
        // console.log(this.state.produk.stock)
        // console.log("name",this.props.cart[0].name)
        axios.get(URL_API + `/products/?name=${this.props.cart[index].name}`)
            .then((res) => {
                console.log("respon data get produk", res.data[0])
                this.setState({ produkStok: res.data[0].stock })
            })
            .catch(err => console.log("error get data", err))

        // console.log("stok", this.state.produkStok)
        if(this.state.produkStok){
            if(this.props.cart[index].qty < this.state.produkStok){
                this.props.cart[index].qty++
                axios.patch(URL_API + `/users/${this.props.id}`, {
                    cart: this.props.cart
                })
                    .then((res) => {
                        console.log("respon data decrement", res.data)
                        this.props.authLogin(res.data)
                    })
                    .catch(err => console.log(err))
            } else {
                alert("stok habis!")
            }
        }
        // if (this.props.cart[index].qty < this.state.produkStok) {
        //     this.props.cart[index].qty++
            
        // } else {
        //     alert("produk habis!")
        // }
    }

    onBtnDecrement = (index) => {
        if (this.props.cart[index].qty > 1) {
            this.props.cart[index].qty--
        }
        axios.patch(URL_API + `/users/${this.props.id}`, {
            cart: this.props.cart
        })
            .then((res) => {
                console.log("respon data decrement", res.data)
                this.props.authLogin(res.data)
            })
            .catch(err => console.log(err))
    }

    printCartUser = () => {
        // console.log("cart", this.props.cart)
        return this.props.cart.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td><InputGroup>
                        <InputGroupAddon addonType="prepend" className="border append-prepend">
                            <span class="material-icons" onClick={() => this.onBtnDecrement(index)}>
                                remove
                                                </span>
                        </InputGroupAddon>
                        <Input size="sm" placeholder="qty" style={{ textAlign: 'center', width: "10px" }} value={item.qty} innerRef={el => this.inputQty = el} />
                        <InputGroupAddon addonType="append" className="append-prepend">
                            <span className="material-icons border" onClick={() => this.onBtnIncrement(index, item.name)}>
                                add
                            </span>
                        </InputGroupAddon>
                    </InputGroup>
                    </td>
                    <td>

                        <Button onClick={() => this.onBtnDelete(index)}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    onBtnCheckOut = () =>{
        this.setState({modal: !this.state.modal})
    }

    render() {
        return (
            <Container>
                <h1 style={{ textAlign: 'center' }}>User Cart</h1>
                <Table>
                    <thead>
                        <td>No</td>
                        <td>Nama</td>
                        <td>Qty</td>
                        <td>Action</td>
                    </thead>
                    <tbody>
                        {this.printCartUser()}
                    </tbody>
                </Table>
                <Button onClick={this.onBtnCheckOut}>Check Out</Button>
                <ModalKonfirm toggle={this.onBtnCheckOut} modal={this.state.modal}/>
            </Container>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        cart: authReducer.cart
    }
}
export default connect(mapStateToProps, { authLogin })(UserCart);