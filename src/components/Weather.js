import React from 'react'
import { Container, Step,Header } from 'semantic-ui-react'
import img from '../assets/O7MF460.jpg'
import WeatherCard from '../components/WeatherCard'
class Weather extends React.Component {
  state={
    date:null
  }
  async componentDidMount()
    {
    await this.setState(()=>({date:new Date(this.props.date*1000)}));
    //this.date.setSeconds(this.props.date);
    }
  render() {
    
    return (
      <div style={{backgroundImage:`url(${img})`,paddingBottom:'40px',borderRadius:'20px'}}>
      <Container>
        <Header as='h1' color="yellow" >{this.props.name}</Header>
        {this.state.date && <Header as='h3'><span style={{color:"wheat"}}>{`${this.state.date.getDate()}/${this.state.date.getMonth()}/${this.state.date.getFullYear()}`}</span></Header>}

        <Step.Group fluid>
          <Step icon="sun yellow"  title='Temperature' description={`${this.props.temperature} C`} >
          </Step>
          <Step icon='sun outline red' title='Feels Like' description={`${this.props.feelslike} C`} />
          <Step
            icon='cloud blue'
            title='Humidity'
            description={`${this.props.humidity}`}
          />
        </Step.Group>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',marginTop:'100px',flexWrap:'wrap'}}>
        {this.props.forecast.list.map((elem)=>{
          return(<WeatherCard weather={elem} desc={elem.weather[0].main}></WeatherCard>)
        })}
        </div>
      </Container>
      </div>
    )
  }
}

export default Weather