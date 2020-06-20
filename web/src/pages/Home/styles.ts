import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #454955;
`;

export const Table = styled.div`
  margin-top: 64px;

  > section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    strong {
      color: #292a30;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }
  }
  span {
    border-radius: 8px;
  }
`;

export const ItemSkeleton = styled(Skeleton)`
  height: 60px;
  margin-bottom: 7px;
`;
