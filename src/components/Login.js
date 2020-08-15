import React, { Component } from 'react'
import { Button, Form, Grid, Header,Message, Segment } from 'semantic-ui-react'
import {Link, Redirect,withRouter} from 'react-router-dom'
import fireapp from '../auth/firebase';
 class Login extends Component {
    handlechange=(field,val)=>{
        this.setState(()=>({[field]:val}));
    }
    state={
        email:'',
        password:'',
    }
    handleSubmit=()=>{
        fireapp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((user)=>{
            console.log(user);
            console.log('signed in');
            this.props.history.push('/');
        })
        .catch((error)=>{
            // Handle Errors here.
           // var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
          });
         
    }
    render() {
        if(this.props.user)
        {
            return(
            <Redirect to="/"></Redirect>)
        }
        else{
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h1' color='teal' textAlign='center'>
                        Log-in
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid 
                             onChange={(e)=>this.handlechange("email",e.target.value)}
                            icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={(e)=>this.handlechange("password",e.target.value)}
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