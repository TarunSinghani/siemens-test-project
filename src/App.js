import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Dashboard></Dashboard>
      <Footer></Footer>
    </div>
  );
}

export default App;
