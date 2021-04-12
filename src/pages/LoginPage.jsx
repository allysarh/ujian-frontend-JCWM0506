import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Container, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { URL_API } from '../helper';
import { authLogin } from '../actions'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            redirect: false
        }
    }

    onBtnLogin = () => {
        // alert("test button login")
        let email = this.inEmail.value
        let password = this.inPassword.value
        let cart = []
        console.log("email", email)
        console.log("password", password)

        axios.get(URL_API + `/users?email=${email}&password=${password}`)
            .then((res) => {
                console.log("respon data login", res.data)
                if (res.data[0]) {
                    alert("login!")
                    this.setState({ redirect: !this.state.redirect })
                    this.props.authLogin(res.data)
                    localStorage.setItem("tkn_id", res.data[0].id)
                }
                else {
                    alert("registering account")
                    // this.setState({ register: true }, () => console.log("register status: ", this.state.register))
                    
                    if(password.length >= 6 && password.match(/[A-Za-z0-9]/ig)){
                        axios.post(URL_API + `/users`, {
                            email, password, cart
                        })
                            .then((res) => {
                                console.log("respon data push:", res.data)
                                localStorage.setItem("tkn_id", res.data.id)
                                this.setState({ redirect: !this.state.redirect })
                            })
                            .catch(err => console.log("error push", err))
                    } else {
                        alert("password yang anda input kurang kuat!")
                    }
                }
            })
            .catch(err => console.log("err get data login", err))

        // axios.post(URL_API + `/users`, {
        //     email, password, cart
        // })
        //     .then((res) => {
        //         console.log("respon data push:", res.data)
        //         localStorage.setItem("tkn_id", res.data.id)
        //         this.setState({ redirect: !this.state.redirect })
        //     })
        //     .catch(err => console.log("error push", err))

        this.inEmail.value = null
        this.inPassword.value = null

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        } else {
            return (
                <Container fluid>
                    <h1 style={{ textAlign: 'center' }}>Login page</h1>
                    <div style={{ width: '50%', margin: 'auto', border: '1px solid black', padding: '10px' }}>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Masukkan Email" innerRef={elemen => this.inEmail = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Masukkan password" innerRef={elemen => this.inPassword = elemen} />
                            </FormGroup>
                            <Button onClick={this.onBtnLogin}>Login</Button>
                        </Form>
                    </div>
                </Container>
            );
        }
    }
}

export default connect(null, { authLogin })(LoginPage);