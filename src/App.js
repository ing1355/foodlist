import './App.css';
import Contents from './Components/Layout/Contents';
import Header from './Components/Layout/Header';
import Sidebar from './Components/Layout/Sidebar';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='contents-container'>
        <Sidebar/>
        <Contents/>
      </div>
    </div>
  );
}

export default App;
