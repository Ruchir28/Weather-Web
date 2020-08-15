import * as firebase from "firebase/app"
import "firebase/auth"
  
  // const fireapp = {
  //   apiKey: "AIzaSyADNYARKUSmf05NoA2Ce6yG5JGSGWH4wFs",
  //   authDomain: "weather-app-bd11e.firebaseapp.com",
  //   databaseURL: "https://weather-app-bd11e.firebaseio.com",
  //   projectId: "weather-app-bd11e",
  //   storageBucket: "weather-app-bd11e.appspot.com",
  //   messagingSenderId: "924191385311",
  //   appId: "1:924191385311:web:c14ffe50bde78c4e90ab6a"
  // };
  const fireapp = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };
  // Initialize Firebase
  const app=firebase.initializeApp(fireapp);

  export default app;