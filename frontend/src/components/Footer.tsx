//React Libraries
import React from 'react';
//Material Commponents

//CustomerStyles
import { FooterStyles } from './Styles';

interface Props {
  contact?: {}
  link?: {}
  logo?: string
}

const Footer: React.FC<Props> = ({
  contact,
  link,
  logo
}: Props) => {
  return (
    <div>
      {contact}
    </div>
  );
};

export default Footer;
