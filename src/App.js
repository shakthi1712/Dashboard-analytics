import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Salesbycountry from './Components/Salesbycountry';
import Usercards from './Components/Usercards';
import Email from './Components/Email'


function App() {
  return (
    <div className="App">
     <Salesbycountry/>
     <Usercards />
     <Email/>
    </div>
  );
}

export default App;
