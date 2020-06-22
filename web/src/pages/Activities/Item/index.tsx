import React from 'react';

import { FiEdit, FiDelete } from 'react-icons/fi';
import More from '../../../components/MorePopup';

import { Container, MoreContainer } from './styles';
import { Activity } from '..';

interface ActivityItemProps {
  data: Partial<Activity>;
  onDelete: Function;
}

const Item: React.FC<ActivityItemProps> = ({ data, onDelete }) => {
  return (
    <Container>
      <section>
        <small>{data.id}</small>
        <small>{data.descricao}</small>

        <div>
          <More>
            <MoreContainer>
              <div>
                <button onClick={() => {}} type="button">
                  <FiEdit color="blue" size={15} />
                  <span>Editar</span>
                </button>
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
