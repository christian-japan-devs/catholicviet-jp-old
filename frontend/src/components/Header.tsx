
//React Libraries
import React from 'react';
//Material Commponents

//CustomerStyles
import { HeaderStyles } from './Styles';

interface Props {
  logo?: string
  menu?: {}
  subMenu?: {}
}

const MainHeader: React.FC<Props> = ({
  logo,
  menu,
  subMenu,
}: Props) => {
  return (
    <div>
      {logo}
    </div>
  );
};

export default MainHeader;
