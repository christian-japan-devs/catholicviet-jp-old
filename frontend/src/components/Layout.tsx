import React from 'react';
//Share components
import Footer from './Footer';
import MainHeader from './Header';
//Utils
import { read } from '../utils/localStorage';
import { VCJTOKEN } from '../utils/constants';
import { AUTH_IS_AUTH } from '../utils/actionTypes';
//App context
import { AppContext } from '../contexts/AppContext';

const CustomerLayout: React.FC = ({ children }) => {
  const { state, dispatch } = React.useContext(AppContext);
  React.useEffect(() => {
    if (read(VCJTOKEN)) {
      dispatch({
        type: AUTH_IS_AUTH,
        payload: true, //TODO: true here cannot go to login when isAuthenticated
      });
    }
  }, []);
  return (
    <div>
      <MainHeader logo={'Hello catholicviet.jp'} />
      {children}
      <Footer />
    </div>
  );
};

export default CustomerLayout;