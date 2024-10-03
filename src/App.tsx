import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login, Account, Budget, Transactions, Statistics, Properties, TaxBilling } from './pages';
import Property from './pages/Property';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Account />} path="/account" />
        <Route element={<Budget />} path="/account/budgets" />
        <Route element={<Transactions />} path="/account/transactions" />
        <Route element={<Statistics />} path="/account/stats" />
        <Route element={<Property />} path="/account/property" />
        <Route element={<Properties />} path="/account/myproperty" />
        <Route element={<TaxBilling />} path="/account/tax-billing" />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
