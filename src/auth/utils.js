
const API_KEY="70268da231c76995aafce228b1fdb766";
const MAP_TOKEN="pk.eyJ1IjoicnVjaGlyMjgiLCJhIjoiY2tkdHd5NWd0MDhzaTJzbnN3emx6dng5NCJ9.B9avZvB1NZ-V2KOZbulUjw";
module.exports.getweather = async (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then((res)=>res.json());
    // const call=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    // const res=await call.json();
    // console.log("in function",res);
    // return res;
}
module.exports.getForecast = async (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then((res)=>res.json());
    // const call=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    // const res=await call.json();
    // console.log("in function",res);
    // return res;
}
module.exports.autoComplete=async (query)=>{
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoicnVjaGlyMjgiLCJhIjoiY2tkdHd5NWd0MDhzaTJzbnN3emx6dng5NCJ9.B9avZvB1NZ-V2KOZbulUjw`)
    .then(res=>res.json())
    .catch((err)=>console.log(err));
}
module.exports.getHistory = async (lat, lon) => {
    //return fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=1597352228&units=metric&appid=70268da231c76995aafce228b1fdb766`).then((res)=>res.json());
    let today=new Date(Date.now());
    today.setDate(today.getDate()-1);
    let temperature=[0,0,0,0,0];
    let humidity=[0,0,0,0,0];
    let call1=await makeTable(lat,lon,today);
    console.log("printed call1",call1);
    temperature[4]=call1.current.temp;
    humidity[4]=call1.current.humidity;
    today.setDate(today.getDate()-1);
    let call2=await makeTable(lat,lon,today);
    temperature[3]=call2.current.temp;
    humidity[3]=call2.current.humidity;
    today.setDate(today.getDate()-1);
    let call3=await makeTable(lat,lon,today);
    temperature[2]=call3.current.temp;
    humidity[2]=call3.current.humidity;
    today.setDate(today.getDate()-1);
    let call4=await makeTable(lat,lon,today);
    temperature[1]=call4.current.temp;
    humidity[1]=call4.current.humidity;
    today.setDate(today.getDate()-1);
    let call5=await makeTable(lat,lon,today);
    humidity[0]=call5.current.humidity;
    temperature[0]=call5.current.temp;
    return {temperature,humidity};
}

let makeTable=async (lat,lon,date)=>{
    console.log(date.getDate());
    return fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${Math.round(date.getTime()/1000)}&units=metric&appid=70268da231c76995aafce228b1fdb766`).then((res)=>res.json());
}