import React, { useEffect, useState, useRef, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';

import { SkeletonTheme } from 'react-loading-skeleton';
import { lighten, shade } from 'polished';

// import api from '../../services/api';

import { Container, Title, Content, Table, ItemSkeleton } from './styles';

import Item from './Item';

import SearchInput from '../../components/SearchInput';
import Button from '../../components/Button';
import Input from '../../components/Input';

type TParams = { id: string };

export interface ActivityResponse {
  id: number;
  data: string;
  descricao: string;
}

export interface Activity {
  id: number;
  descricao: string;
  idProjeto: number;
}

interface ActivityFormData {
  description: string;
}

const Activities: React.FC<RouteComponentProps<TParams>> = ({
  match,
}: RouteComponentProps<TParams>) => {
  const formRef = useRef<FormHandles>(null);

  const { id: projectId } = match.params;

  const [activities, setActivities] = useState<ActivityResponse[]>([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ActivityFormData) => {
      /* const response = await api.post('atividades', {
        idProjeto: projectId,
        descricao: data.description,
      });

      setActivities(oldActivities => [...oldActivities, response.data]); */
    },
    [projectId],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      const confirm = window.confirm('Deseja excluir a atividade?');

      if (!confirm) {
        toast.error('Atividade não removida!');
        return;
      }

      try {
        // await api.delete(`atividades/${id}`);

        setActivities(activities.filter(activity => activity.id !== id));

        toast.success('Atividade removida com sucesso!');
      } catch (err) {
        toast.error('Essa atividade não pode ser removida!');
      }
    },
    [activities],
  );

  useEffect(() => {
    async function loadActivities(): Promise<void> {
      setLoading(true);

      /* const response = await api.get<ActivityResponse[]>(
        `projetos/${projectId}/atividades`,
      ); */

      // setActivities(response.data);

      setTimeout(() => {
        setLoading(false);
      }, 1600);
    }

    loadActivities();
  }, [handleSubmit, projectId]);

  return (
    <SkeletonTheme
      color={shade(0.04, '#F3EFF5')}
      highlightColor={lighten(0.04, '#F3EFF5')}
    >
      <Container>
        <Title>Projeto tal</Title>

        <div className="action-content">
          <SearchInput />
          <Title>Atividades</Title>
          <Popup
            trigger={<Button Icon={FiPlus} title="ADICIONAR" type="button" />}
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
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Content>
                <strong style={{ fontSize: 24 }}>Nova atividade</strong>
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

        <Table>
          <section>
            <strong>Id</strong>
            <strong>Descrição</strong>
            <strong>Ações</strong>
          </section>
        </Table>

        {loading === true ? (
          <ItemSkeleton duration={2} count={5} />
        ) : (
          activities.map(activity => (
            <Item
              onDelete={handleDelete}
              key={activity.id}
              data={{
                id: activity.id,
                descricao: activity.descricao,
              }}
            />
          ))
        )}
      </Container>
    </SkeletonTheme>
  );
};

export default Activities;
