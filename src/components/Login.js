import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import fireapp from '../auth/firebase';
import Loading from './Loading'
class Login extends Component {
    handlechange = (field, val) => {
        this.setState(() => ({ [field]: val }));
    }
    state = {
        loading:false,
        email: '',
        password: '',
        error:''
    }
    handleSubmit = () => {
        this.setState(() => ({ loading: true,error:''}));
        fireapp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                console.log(user);
                console.log('signed in');
                this.props.history.push('/');
            })
            .catch((error) => {
                // Handle Errors here.
                // var errorCode = error.code;
                var errorMessage = error.message;
                this.setState(()=>({error:errorMessage}));
                console.log(errorMessage);
                // ...
            });
           this.setState(() => ({ loading:false}));
    }
    render() {
        if (this.props.user) {
            return (
                <Redirect to="/"></Redirect>)
        }
        else {
            return (
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h1' color='teal' textAlign='center'>
                            Log-in
                    </Header>
                        {this.state.loading && <div class="alert alert-primary" role="alert">
                            Signing in...
                        </div>}
                        {this.state.error && <div class="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>}
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid
                                    onChange={(e) => this.handlechange("email", e.target.value)}
                                    icon='user' iconPosition='left' placeholder='E-mail address' />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => this.handlechange("password", e.target.value)}
                                />
                                <Button onClick={this.handleSubmit} color='blue' fluid size='large'>
                                    Login
                            </Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to='/signup'>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            )
        }
    }
}
export default withRouter(Login);