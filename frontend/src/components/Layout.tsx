import React from 'react';
import MainFooter from './Footer';
import MainHeader from './Header';

const CustomerLayout = (props: any) => {
  return (
    <div>
      <MainHeader />
      {props.children}
      <MainFooter />
    </div>
  );
};

export default CustomerLayout;
