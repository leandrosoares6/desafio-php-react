import React, { useEffect, useState } from 'react';

import { SkeletonTheme } from 'react-loading-skeleton';
import { lighten, shade } from 'polished';
import { Container, Title, Table, ItemSkeleton } from './styles';
import Project from '../Project';

import api from '../../services/api';

import Item from './Item';

export interface Project {
  id: number;
  descricao: string;
}

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProjects(): Promise<void> {
      setLoading(true);

      const response = await api.get<Project[]>('/projetos');

      setProjects(response.data);

      setTimeout(() => {
        setLoading(false);
      }, 1600);
    }

    loadProjects();
  }, []);

  return (
    <SkeletonTheme
      color={shade(0.04, '#F3EFF5')}
      highlightColor={lighten(0.04, '#F3EFF5')}
    >
      <Container>
        <div>
          <Title>Meus projetos</Title>
        </div>
        <Table>
          <section>
            <strong>Id</strong>
            <strong>Descrição</strong>
          </section>
        </Table>

        {loading === true ? (
          <ItemSkeleton duration={2} count={5} />
        ) : (
          projects.map(project => (
            <Item
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
