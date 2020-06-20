import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding-bottom: 10px;
  small {
    padding: 20px 32px;
    border: 0;
    background: #fff;
    font-size: 16px;
    font-weight: normal;
    color: #666;
    text-align: left;
  }
  small:first-child {
    border-radius: 8px 0 0 8px;
  }
  small:last-child {
    border-radius: 0 8px 8px 0;
  }
`;
