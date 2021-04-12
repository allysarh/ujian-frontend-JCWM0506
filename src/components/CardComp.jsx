import React from 'react'
import { connect } from 'react-redux';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import ModalAlert from './ModalAlert';
import ModalInput from './ModalInput';

class CardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalInput: false
        }
    }

    toggle = () => {
            this.setState({ modal: !this.state.modal })
    }

    render() {
        return (
            <>
                <div>
                    <Card className="m-2">
                        <CardImg top width="100%" src={this.props.img} alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">{this.props.nama}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Rp. {this.props.price.toLocaleString()}</CardSubtitle>
                            <CardSubtitle>{this.props.description}</CardSubtitle>
                            <CardSubtitle>Stok: {this.props.stok}</CardSubtitle>
                            <Button onClick={this.toggle}>Add to Cart</Button>
                        </CardBody>
                    </Card>
                    {
                        this.props.email ?
                        <ModalInput modal={this.state.modal} toggle={this.toggle} nama={this.props.nama} stok={this.props.stok} id={this.props.id}/>
                        :
                        <ModalAlert modal={this.state.modal} toggle={this.toggle} />
                    }
                </div>

            </>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        email: authReducer.email
    }
}
export default connect(mapStateToProps)(CardComp);