import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import fireapp from '../auth/firebase';
import {Redirect} from 'react-router-dom';
 class Signup extends Component {
    state={
        email:'',
        password:''
    }
    handlechange=(field,val)=>{
        this.setState(()=>({[field]:val}));
    }
    handleSubmit=()=>{
        fireapp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            //let errorCode = error.code;
            let errorMessage = error.message;
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
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                        Sign Up
                    {/* {JSON.stringify(this.state)} */}
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' 
                          onChange={(e)=>this.handlechange("email",e.target.value)}
                        iconPosition='left' placeholder='E-mail address' />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange={(e)=>this.handlechange("password",e.target.value)}
                        />

                        <Button onClick={this.handleSubmit}  color='blue' fluid size='large'>
                            Create
                     </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
        )
    }
}
export default Signup;