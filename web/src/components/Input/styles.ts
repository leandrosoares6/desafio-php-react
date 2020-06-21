import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  containsError: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding-top: 10px;
  background: #fff;
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  border: 2px solid #fff;
  color: #666360;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.containsError === true &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused === true &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled === true &&
    css`
      color: #ff9000;
    `}


  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
