import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > strong {
    padding-top: 24px;
    font-size: 32px;
    color: #454955;
  }

  .action-content {
    padding-top: 32px;
    display: flex;
    justify-content: space-between;
  }
`;

export const Title = styled.h1`
  text-align: center;
  padding-top: 48px;
  font-size: 48px;
  color: #454955;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;

  > strong {
    padding-bottom: 24px;
  }
`;

export const Table = styled.div`
  margin-top: 64px;

  > section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    strong {
      color: #292a30;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    strong:last-child {
      text-align: right;
    }
  }
`;

export const ItemSkeleton = styled(Skeleton)`
  height: 60px;
  margin-bottom: 7px;
`;
