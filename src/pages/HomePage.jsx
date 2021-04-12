import axios from 'axios';
import React from 'react'
import { Container } from 'reactstrap';
import CardComp from '../components/CardComp';
import ModalAlert from '../components/ModalAlert';
import { URL_API } from '../helper';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    printCard = () => {
        return this.state.produk.map((item, index) => {
            return <CardComp
                id={item.id}
                nama={item.name}
                img={item.img}
                price={item.price}
                stok={item.stock}
                description={item.description} />
        })
    }

    
    render() {
        return (
            <Container fluid>
                <h4 style={{textAlign: 'center'}}>Welcome to Nike</h4>
                <div className="d-flex">
                    {this.printCard()}
                </div>
                
            </Container>
        );
    }
}

export default HomePage;