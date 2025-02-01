import Navbar from './Navbar';
import Home from './Home';
import Map from './Map';
import Systems from './Systems';
import Diseases from './Diseases';
import Discussions from './Discussions';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/map" element={<Map/>}></Route>
            <Route path="/systems" element={<Systems/>}></Route>
            <Route path="/diseases" element={<Diseases/>}></Route>
            <Route path="/discussions" element={<Discussions/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
