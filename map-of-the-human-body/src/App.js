import Navbar from './Navbar';
import Home from './Home';
import Map from './Map';
import Systems from './Systems';
import Diseases from './Diseases';
import Discussions from './Discussions';
import Create from './Create';
import DiscussionDetails from './DiscussionDetails';
import Reply from './Reply';
import Edit from './Edit';
import NotFound from './NotFound';
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
            <Route path="/discussions/create" element={<Create/>}></Route>
            <Route path="/discussions/:id" element={<DiscussionDetails/>}></Route>
            <Route path="/discussions/:id/reply" element={<Reply/>}></Route>
            <Route path="/discussions/:id/edit" element={<Edit/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
