import React, { Component } from 'react'
import fireapp from '../auth/firebase';
import { Redirect } from 'react-router-dom';
import { Button, Search, Menu, Container,Tab} from 'semantic-ui-react'
import { getweather,autoComplete,getForecast,getHistory } from '../auth/utils'
import Weather from './Weather';
import Loading from './Loading';
import LineChart from './LineChart';

class Home extends Component {
    state = {
        lat: '',
        lon: '',
        weather: null,
        locationInfo: null,
        forecast:null,
        temperature:null,
        loading:false
    }
    async componentDidMount() {
        // await navigator.geolocation.getCurrentPosition(async (position) => {
        //     await this.setState(() => ({ lat: position.coords.latitude, lon: position.coords.longitude }));
        //     await this.getweatherHERE();
        // });
        await this.setState(() => ({ lat: 24.73, lon: 75.93 }));
        await this.getweatherHERE();
        //await getweather(this.state.lat,this.state.lon);
    }

    getweatherHERE = async () => {
        //this.setState(()=>({loading:true}))
        let weather = await getweather(this.state.lat, this.state.lon)
        console.log("here", weather);
        this.setState(() => ({ weather }));
        let forecast = await getForecast(this.state.lat, this.state.lon);
        console.log(forecast);
        let arr=[];
        for(let i=0;i<40;i++)
        {
            arr[i]=forecast.list[i];
            i+=8;
        }
        forecast.list=arr;
        this.setState(()=>({forecast,loading:false}));
        let History=await getHistory(this.state.lat,this.state.lon);
        console.log(History);
        this.setState(()=>({temperature:History.temperature}));
        this.setState(()=>({humidity:History.humidity}));
    }
    signout = () => {
        fireapp.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
    search = async (query) => {
        await autoComplete(query).then((data) => {
            this.setState(() => ({ locationInfo: data }));
        })
    }
    render() {
        const panes = [
            { menuItem: 'Temperature', render: () => <Tab.Pane>{this.state.temperature ? <LineChart temperature={this.state.temperature} label="temperature"></LineChart>:(<Loading text="fetching anayltics..."></Loading>)}
            </Tab.Pane> },
            { menuItem: 'Humidity', render: () => <Tab.Pane> {this.state.humidity ? <LineChart temperature={this.state.humidity} label="humidity"></LineChart>:(<Loading text="fetching anayltics..."></Loading>)}</Tab.Pane> },
          ]
        if(this.state.loading)
        {
            return(<Loading></Loading>)
        }
        if (this.props.user) {
            if (!this.state.weather) {
                return (<Loading></Loading>)
            }
            return (
                <div>
                    <Container>
                        <Menu borderless>
                            <Menu.Item position="left">
                                <Search
                                    loading={false}
                                    onSearchChange={(e) => this.search(e.target.value)}
                                    results={this.state.locationInfo && this.state.locationInfo.features && this.state.locationInfo.features.map((elem) => ({ title: elem.place_name, coords: elem.geometry.coordinates }))}
                                    //value={}
                                    onResultSelect={async (e, data) => {
                                        console.log(data.result);
                                        this.setState(()=>({temperature:null,humidity:null}));
                                        await this.setState(() => ({ lat: data.result.coords[1], lon: data.result.coords[0] }));
                                        await this.getweatherHERE();
                                    }
                                    }
                                ></Search>
                            </Menu.Item>

                            <Menu.Item position="right" >
                                <Button
                                    secondary
                                    onClick={this.signout}
                                >Sign Out</Button>
                            </Menu.Item>
                        </Menu>
                        <div style={{marginBottom:'40px'}}>
                            {
                                this.state.forecast && <Weather forecast={this.state.forecast} date={this.state.weather.dt} name={this.state.weather.name} temperature={this.state.weather.main.temp} feelslike={this.state.weather.main.feels_like} humidity={this.state.weather.main.temp} precipitation={this.state.weather.main.temp}></Weather>
                            }
                        
                        </div>
                        {/* {this.state.forecast && this.state.forecast.list && this.state.forecast.list.map((elem)=>{
                        return(<WeatherCard weather={elem} desc={elem.weather[0].main}></WeatherCard>)   
                        })}  */}
                        <Tab panes={panes}></Tab>
                        {/* {this.state.temperature ? <LineChart temperature={this.state.temperature}></LineChart>:(<Loading text="fetching anayltics..."></Loading>)}
                        {this.state.humidity ? <LineChart temperature={this.state.humidity}></LineChart>:(<Loading text="fetching anayltics..."></Loading>)} */}

                    </Container>
                   
                </div>
            )
        }
        return (
            <Redirect to="/login"></Redirect>
        )

    }
}
export default Home;