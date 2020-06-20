import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import Popup, { Props } from 'reactjs-popup';

import { Container } from './styles';

const MorePopup: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Popup
      trigger={
        <Container type="button">
          <FiMoreHorizontal color="#666" size={25} />
        </Container>
      }
      position="bottom center"
      contentStyle={{
        width: '150px',
        borderRadius: '4px',
      }}
      {...rest}
    >
      {children}
    </Popup>
  );
};

export default MorePopup;
