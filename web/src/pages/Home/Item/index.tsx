import React from 'react';
import { Link } from 'react-router-dom';

import { FiEdit, FiDelete } from 'react-icons/fi';
import More from '../../../components/MorePopup';

import { Container, MoreContainer } from './styles';
import { Project } from '..';

interface ProjectItemProps {
  data: Partial<Project>;
  onDelete: Function;
}

const Item: React.FC<ProjectItemProps> = ({ data, onDelete }) => {
  return (
    <Container>
      <section>
        <small>{data.id}</small>
        <small>{data.descricao}</small>

        <div>
          <More>
            <MoreContainer>
              <div>
                <Link
                  to={{
                    pathname: '/activities',
                    state: {
                      data,
                    },
                  }}
                >
                  <FiEdit color="blue" size={15} />
                  <span>Gerenciar</span>
                </Link>
              </div>
              <div>
                <button onClick={() => onDelete(data.id)} type="button">
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
