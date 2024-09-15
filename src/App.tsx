import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login, Account } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Account />} path="/account" />
      </Routes>
    </div>
  );
}

export default App;
