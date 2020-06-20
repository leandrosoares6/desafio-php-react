import React from 'react';

import { Container } from './styles';
import { Project } from '..';

interface ProjectItemProps {
  data: Partial<Project>;
}

const Item: React.FC<ProjectItemProps> = ({ data }) => {
  return (
    <Container>
      <small>{data.id}</small>
      <small>{data.descricao}</small>
    </Container>
  );
};

export default Item;
