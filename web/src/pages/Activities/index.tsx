import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  ChangeEvent,
} from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiPlus, FiArrowLeft } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';

import { SkeletonTheme } from 'react-loading-skeleton';
import { lighten, shade } from 'polished';

import axios from 'axios';

import { Container, Title, Content, Table, ItemSkeleton } from './styles';

import Item from './Item';

import SearchInput from '../../components/SearchInput';
import Button from '../../components/Button';
import Input from '../../components/Input';

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

const Activities: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { state } = useLocation();

  const { id: projectId, descricao } = state.data;

  const [activities, setActivities] = useState<ActivityResponse[]>([]);

  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ActivityFormData) => {
      const response = await axios.post('atividades', {
        idProjeto: projectId,
        descricao: data.description,
      });

      setActivities(oldActivities => [...oldActivities, response.data]);
    },
    [projectId],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`atividades/${id}`);

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

      const response = await axios.get<ActivityResponse[]>(
        `projetos/${projectId}/atividades`,
        {
          params: {
            q: search,
          },
        },
      );

      setActivities(response.data);

      setTimeout(() => {
        setLoading(false);
      }, 1600);
    }

    loadActivities();
  }, [handleSubmit, projectId, search]);

  return (
    <SkeletonTheme
      color={shade(0.04, '#F3EFF5')}
      highlightColor={lighten(0.04, '#F3EFF5')}
    >
      <Container>
        <div className="header-content">
          <Link to="/">
            <FiArrowLeft size={36} />
          </Link>
          <Title>{descricao}</Title>
        </div>
        <strong>Atividades</strong>

        <div className="action-content">
          <SearchInput
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target?.value)
            }
            placeholder="Buscar por atividades"
          />

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
