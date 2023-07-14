
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Comp/User_folder/Nav_bar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Comp/User_folder/Home';
import Laptops from './Comp/User_folder/Laptops';
import Phones from './Comp/User_folder/Phones';
import Other from './Comp/User_folder/Other';
import Admin from './Comp/Admin_Folder/Admin';
import SpecificItem from './Comp/User_folder/specific_item';
import SignInForm from './Comp/Admin_Folder/SignIn';
function App() {
  return (

<div className="App">
      <Router>
        <NavBar/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/laptops" element={<Laptops/>} />
        <Route path="/phones" element={<Phones/>} />
        <Route path="/other/:identity" element={<Other/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/signin" element={<SignInForm/>} />
        <Route path="/view/:id/:type" element={<SpecificItem/>} />
        </Routes>
      </Router>
    </div>

    
    
  );
}

export default App;
