import React, { Component } from 'react'
export default class WeatherCard extends Component {
    state={
        desc:"",
        date:null
    }
    async componentDidMount()
    {
       await this.setState(()=>({date:new Date(this.props.weather.dt*1000)}))
    }
    
     render() {
        return (
            <div style={{display:'flex',padding:'10px',flexDirection:'column',justifyContent:'center',alignItems:'center',borderRadius:'10px',boxShadow:'2px 2px 2px 2px',width:'100px',textAlign:'center',margin:'10px'}}>
               {this.state.date && <h5 className='display-5'>
               {`${this.state.date.getDate()}/${this.state.date.getMonth()}/${this.state.date.getFullYear()}`}
                   </h5>}
                {this.props.desc.includes('Rain') && <img style={{width:'70px',height:'70px'}} src={require(`../assets/rain.svg`)}></img>}
                {this.props.desc.includes('Cloud') && <img style={{width:'70px',height:'70px'}} src={require(`../assets/clouds.svg`)}></img>}
                {this.props.desc.includes('Clear')  && <img style={{width:'70px',height:'70px'}} src={require(`../assets/sun.svg`)}></img>}
                <p>{this.props.weather.weather[0].description}</p>
                {this.state.desc}
                
            </div>
        )
    }
}
