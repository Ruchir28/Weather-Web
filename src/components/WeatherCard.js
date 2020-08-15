import React, { Component } from 'react'
import clouds from '../assets/clouds.svg'
import sun from '../assets/sun.svg'
import rain from '../assets/rain.svg'


export default class WeatherCard extends Component {
    state={
        desc:"",
        date:null
    }
    componentDidMount()
    {
        if(this.props.desc.includes('Clear'))
        {
            this.setState(()=>({desc:'sun'}))
        }
        else if(this.props.desc.includes('Cloud'))
        {
            this.setState(()=>({desc:'cloud'}))
        }
        else if(this.props.desc.includes('Rain'))
        {
            this.setState(()=>({desc:'rain'}))
        }
        this.setState(()=>({date:new Date(this.props.weather.dt*1000)}))
    }
    render() {
        return (
            <div style={{display:'flex',padding:'10px',flexDirection:'column',justifyContent:'center',alignItems:'center',borderRadius:'10px',boxShadow:'2px 2px 2px 2px',width:'100px',textAlign:'center',margin:'10px'}}>
               {this.state.date && <h5 className='display-5'>
               {`${this.state.date.getDate()}/${this.state.date.getMonth()}/${this.state.date.getFullYear()}`}
                   </h5>}
                {this.state.desc==='rain' && <img style={{width:'70px',height:'70px'}} src={require(`../assets/rain.svg`)}></img>}
                {this.state.desc==='cloud' && <img style={{width:'70px',height:'70px'}} src={require(`../assets/clouds.svg`)}></img>}
                {this.state.desc==='sun' && <img style={{width:'70px',height:'70px'}} src={require(`../assets/sun.svg`)}></img>}
                <p>{this.props.weather.weather[0].description}</p>
                
            </div>
        )
    }
}
