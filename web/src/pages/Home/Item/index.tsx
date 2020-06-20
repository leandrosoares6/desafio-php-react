import React from 'react';

import { FiEdit, FiDelete } from 'react-icons/fi';
import More from '../../../components/MorePopup';

import { Container, MoreContainer } from './styles';
import { Project } from '..';

import history from '../../../services/history';

interface ProjectItemProps {
  data: Partial<Project>;
}

const Item: React.FC<ProjectItemProps> = ({ data }) => {
  return (
    <Container>
      <section>
        <small>{data.id}</small>
        <small>{data.descricao}</small>

        <div>
          <More>
            <MoreContainer>
              <div>
                <button
                  onClick={() => history.push(`/projects/form/${data.id}`)}
                  type="button"
                >
                  <FiEdit color="blue" size={15} />
                  <span>Gerenciar</span>
                </button>
              </div>
              <div>
                <button onClick={() => {}} type="button">
                  <FiDelete color="red" size={15} />
                  <span>Excluir</span>
                </button>
              </div>
            </MoreContainer>
          </More>
        </div>
      </section>
    </Container>
  );
};

export default Item;
