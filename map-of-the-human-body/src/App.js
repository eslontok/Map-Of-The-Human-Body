import "./css/master.css";
import Navbar from './Navbar';
import Home from './Home';
import BodyMap from './BodyMap';
import Systems from './Systems';
import Diseases from './Diseases';
import Discussions from './Discussions';
import Create from './Create';
import DiscussionDetails from './DiscussionDetails';
import Comments from './Comments';
import Edit from './Edit';
import NotFound from './NotFound';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

/**
 * App component serves as the root component
 * Renders the component associated with the current route path (default path leads to Home page)
 * @author Earl Lontok
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/map" element={<BodyMap/>}></Route>
            <Route path="/systems" element={<Systems/>}></Route>
            <Route path="/diseases" element={<Diseases/>}></Route>
            <Route path="/discussions" element={<Discussions/>}></Route>
            <Route path="/discussions/create" element={<Create/>}></Route>
            <Route path="/discussions/:id" element={<DiscussionDetails/>}></Route>
            <Route path="/discussions/:id/comments" element={<Comments/>}></Route>
            <Route path="/discussions/:id/edit" element={<Edit/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
