import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  ChangeEvent,
} from 'react';

import { FiPlus } from 'react-icons/fi';

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

export interface Project {
  id: number;
  descricao: string;
}

interface ProjectFormData {
  description: string;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [projects, setProjects] = useState<Project[]>([]);

  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: ProjectFormData) => {
    const response = await axios.post('/projetos', {
      descricao: data.description,
    });

    setProjects(oldProjects => [...oldProjects, response.data]);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      const confirm = window.confirm(
        'Ao excluir o projeto as atividades relacionadas também serão removidas. Deseja prosseguir?',
      );

      if (!confirm) {
        toast.error('Projeto não removido!');
        return;
      }

      try {
        await axios.delete(`projetos/${id}`);

        setProjects(projects.filter(project => project.id !== id));

        toast.success('Projeto removido com sucesso!');
      } catch (err) {
        toast.error('Esse projeto não pode ser removido!');
      }
    },
    [projects],
  );

  useEffect(() => {
    async function loadProjects(): Promise<void> {
      setLoading(true);

      const response = await axios.get<Project[]>('/projetos', {
        params: {
          q: search,
        },
      });

      setProjects(response.data);

      setTimeout(() => {
        setLoading(false);
      }, 600);
    }

    loadProjects();
  }, [handleSubmit, search]);

  return (
    <SkeletonTheme
      color={shade(0.04, '#F3EFF5')}
      highlightColor={lighten(0.04, '#F3EFF5')}
    >
      <Container>
        <Title>Meus projetos</Title>

        <div className="action-content">
          <SearchInput
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target?.value)
            }
            placeholder="Buscar por projetos"
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
          projects.map(project => (
            <Item
              onDelete={handleDelete}
              key={project.id}
              data={{
                id: project.id,
                descricao: project.descricao,
              }}
            />
          ))
        )}
      </Container>
    </SkeletonTheme>
  );
};

export default Home;
