import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Table, Button} from 'reactstrap';
import { URL_API } from '../helper';

class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            transactions: []
        }
    }

    componentDidMount() {
        this.getHistory()
        console.log("email", this.state.email)
    }
    getHistory = () => {
        // console.log(this.props.id)
        axios.get(URL_API + `/transactions`)
            .then((res) => {
                console.log("res transaksi", res.data)
                this.setState({ transactions: res.data })
                console.log("transactions state", this.state.transactions)
            })
            .catch(err => console.log("error get data transaksi", err))

    }

    onBtnCancel = (id) =>{
        // let transaksiUser = this.state.transactions.filter((item, index) => {
        //     if (item.email === this.props.email) {
        //         return item
        //     }
        // })
        // transaksiUser.splice(index, 1)
        axios.delete(URL_API + `/transactions/${id}`)
        .then((res) =>{
            console.log("res del", res.data)
            this.getHistory()
        }).catch(err => console.log("err del", err))
    }
    printHistory = () => {
        let transaksiUser = this.state.transactions.filter((item, index) => {
            if (item.email === this.props.email) {
                return item
            }
        })
        console.log("transaksi user filtered", transaksiUser)
        return transaksiUser.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>
                        {
                            item.cart.map((val, idx) => {
                                return (
                                    <>
                                        <span>{val.name} x {val.qty}</span><br />
                                    </>
                                )
                            })
                        }
                    </td>
                    <td>{item.status}</td>
                    <td>
                        <Button onClick={() => this.onBtnCancel(item.id)}>Cancel</Button>
                    </td>
                </tr>
            )
        })

    }
    render() {
        return (
            <>
                <h1>History Page</h1>
                <Table>
                    <thead>
                        <td>No</td>
                        <td>Produk yang dibeli</td>
                        <td>Status</td>
                        <td>Action</td>
                    </thead>
                    <tbody>
                        {this.printHistory()}
                    </tbody>
                </Table>
            </>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        id: authReducer.id,
        cart: authReducer.cart,
        email: authReducer.email
    }
}

export default connect(mapStateToProps)(HistoryPage);