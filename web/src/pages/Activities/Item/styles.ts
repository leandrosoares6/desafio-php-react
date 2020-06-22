import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 10px;
  section {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #fff;
    border-radius: 4px;

    > small {
      padding: 20px 32px;
      border: 0;
      font-size: 16px;
      font-weight: normal;
      color: #666;
      text-align: left;
    }

    > div {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;

      > button {
        margin-right: 40px;
      }
    }
  }
`;

export const MoreContainer = styled.div`
  > div {
    padding: 5px;
    display: flex;
    align-items: center;
    padding-bottom: 6px;
    button {
      background: none;
      border: none;
      display: flex;
    }
    svg {
      margin-right: 8px;
    }
    span {
      font-size: 16px;
      color: #666;
    }
    :nth-last-child(-n + 1) {
      padding-top: 6px;
      border-top: 1px solid #eee;
    }
    :nth-last-child(1) {
      padding-bottom: 0;
    }
  }
`;
