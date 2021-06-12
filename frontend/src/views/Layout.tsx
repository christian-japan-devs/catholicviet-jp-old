import React from 'react';
import Divider from '@material-ui/core/Divider';
//Share components
import { PageTitle } from '../components/PageTitle';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header/Header';
import { HeaderLinks } from '../components/Header/HeaderLinks';
//App context
import { AppContext } from '../contexts/AppContext';
//Auth actions
import { useAuth } from '../hooks/authAction';

const Layout: React.FC = ({ children }) => {
  const { state, dispatch } = React.useContext(AppContext);
  const { Logout, AuthCheckState } = useAuth();

  React.useEffect(() => {
    AuthCheckState(dispatch, state.auth);
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
        rightLinks={<HeaderLinks color="rose" isAuthenticated={state.auth.isAuthenticated} handleLogout={handleLogout} />}
        fixed={true}
        color="white"
        changeColorOnScroll={{
          height: 200,
          color: "transparent",
        }}
      />
      {children}
      <br />
      <Divider />
      <Footer whiteFont={false} />
    </>
  );
};

export default Layout;
