import React from 'react';
//Share components
import PageTitle from './PageTitle';
import Footer from './Footer';
import Header from './Header/Header';
import HeaderLinks from './Header/HeaderLinks';
//App context
import { AppContext } from '../contexts/AppContext';
//Auth actions
import { useAuth } from '../hooks/authAction';

const CustomerLayout: React.FC = ({ children }) => {
  const { state, dispatch } = React.useContext(AppContext);
  const { Logout, AuthCheckState } = useAuth();

  React.useEffect(() => {
    AuthCheckState(dispatch);
    //TODO: Get init color setting for appbar...
  }, []);

  const handleLogout = (() => {
    Logout(dispatch);
  })
  return (
    <>
      <PageTitle
        title='CatholicVietJp'
      />
      <Header
        brand="CatholicViet.Jp"
        rightLinks={<HeaderLinks isAuthenticated={state.auth.isAuthenticated} handleLogout={handleLogout} />}
        fixed={true}
        color="white"
        changeColorOnScroll={{
          height: 300,
          color: "rose",
        }}
      />
      {children}
      <Footer whiteFont={false} />
    </>
  );
};

export default CustomerLayout;
