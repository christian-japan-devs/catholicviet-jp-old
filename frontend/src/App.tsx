import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Route path="/login" component={Login} />
    </BrowserRouter>
  );
}

export default App;
