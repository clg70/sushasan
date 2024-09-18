import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login, Account, Budget, Transactions } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Account />} path="/account" />
        <Route element={<Budget />} path="/account/budgets" />
        <Route element={<Transactions />} path="/account/transactions" />
      </Routes>
    </div>
  );
}

export default App;
