import React from 'react';

import { FiSearch } from 'react-icons/fi';
import { Container } from './styles';

type CommonProps = {
  className?: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: any) => void;
};

const SearchInput: React.FC<CommonProps> = ({ ...rest }) => {
  return (
    <Container>
      <FiSearch color="#999" size={16} />
      <input type="text" {...rest} />
    </Container>
  );
};

export default SearchInput;
