import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import fireapp from '../auth/firebase';
import {Redirect} from 'react-router-dom';
 class Signup extends Component {
    state={
        email:'',
        password:'',
        loading:false,
        error:''
    }
    handlechange=(field,val)=>{
        this.setState(()=>({[field]:val}));
    }
    handleSubmit=async ()=>{
         this.setState(()=>({loading:true}));
        fireapp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error)=>{
            // Handle Errors here.
            //let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorMessage);
            this.setState(()=>({error:errorMessage}));
            // ...
          });
          this.setState(()=>({loading:false}));     
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
                <div class="alert alert-primary" role="alert">
                            You will be automatically Signed in..
                    </div>
                {this.state.loading && <div class="alert alert-primary" role="alert">
                            Signing in...
                        </div>}
                        {this.state.error && <div class="alert alert-danger" role="alert">
                            {this.state.error}
                        </div>}
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