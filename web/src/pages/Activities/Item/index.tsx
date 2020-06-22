import React, { useRef, useCallback, useState } from 'react';

import { FiEdit, FiDelete } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Popup from 'reactjs-popup';
import axios from 'axios';
import More from '../../../components/MorePopup';

import { Container, MoreContainer, Content } from './styles';

import { Activity } from '..';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

interface ActivityItemProps {
  data: Partial<Activity>;
  onDelete: Function;
}

interface ActivityFormData {
  description: string;
}

const Item: React.FC<ActivityItemProps> = ({ data, onDelete }) => {
  const formRef = useRef<FormHandles>(null);

  const [description, setDescription] = useState(data.descricao);

  const handleSubmit = useCallback(
    async (formData: ActivityFormData) => {
      const response = await axios.put(`/atividades/${data.id}`, {
        descricao: formData.description,
      });

      const { descricao } = response.data;
      setDescription(descricao);
    },
    [data.id],
  );

  return (
    <Container>
      <section>
        <small>{data.id}</small>
        <small>{description}</small>

        <div>
          <More>
            <MoreContainer>
              <div>
                <Popup
                  trigger={
                    <button type="button">
                      <FiEdit color="blue" size={15} />
                      <span>Editar</span>
                    </button>
                  }
                  modal
                  position="center center"
                  contentStyle={{
                    width: '720px',
                    height: '240px',
                    borderRadius: '4px',
                    padding: '32px',
                    background: '#F3EFF5',
                  }}
                  overlayStyle={{
                    background: 'rgb(0, 0, 0, 0.7)',
                    border: 'rgb(0, 0, 0, 0.7)',
                  }}
                >
                  <Form
                    ref={formRef}
                    initialData={{ description }}
                    onSubmit={handleSubmit}
                  >
                    <Content>
                      <strong style={{ fontSize: 24 }}>Novo projeto</strong>
                      <Input name="description" placeholder="Descrição" />
                    </Content>

                    <Button
                      type="submit"
                      style={{ marginLeft: 542 }}
                      title="ADICIONAR"
                    />
                  </Form>
                </Popup>
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
