import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Button
} from 'reactstrap';
import { authLogout, authLogin } from '../actions'
import { URL_API } from '../helper';

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    componentDidMount(){
        this.getDataUser()
    }
    
    getDataUser =()=>{
        axios.get(URL_API + `/users`)
            .then((res) => {
                console.log("respon data login", res.data)
            })
            .catch(err => console.log("err get data login", err))

    }
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Home</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Hello {this.props.email}</NavLink>
                            </NavItem>
                            <NavItem>
                                <Link to="/cart">
                                    <NavLink >Cart</NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/history">
                                    <NavLink >History</NavLink>
                                </Link>
                            </NavItem>
                            
                        </Nav>
                        {
                            this.props.email ?
                                <Button onClick={this.props.authLogout}>Logout</Button>
                                :
                                <Link to="/login">
                                    <NavbarText>Login</NavbarText>
                                </Link>
                        }

                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ({ authReducer }) => {
    return {
        email: authReducer.email

    }
}
export default connect(mapStateToProps, { authLogout, authLogin })(NavbarComp);