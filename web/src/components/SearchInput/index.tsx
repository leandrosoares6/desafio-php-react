import React from 'react';

import { FiSearch } from 'react-icons/fi';
import { Container } from './styles';

const SearchInput: React.FC = ({ ...rest }) => {
  return (
    <Container>
      <FiSearch color="#999" size={16} />
      <input type="text" {...rest} />
    </Container>
  );
};

export default SearchInput;
