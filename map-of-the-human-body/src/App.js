import Navbar from './Navbar';
import Home from './Home';
import Discussions from './Discussions';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        {/*<Home/>*/}  {/* TEMPORARILY DISABLED */}
        <Discussions/>
      </div>
    </div>
  );
}

export default App;
