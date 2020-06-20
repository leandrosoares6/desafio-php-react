import React, { ButtonHTMLAttributes } from 'react';

import { IconType } from 'react-icons';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  Icon: IconType;
};

const Button: React.FC<ButtonProps> = ({ Icon, title, ...rest }) => (
  <Container type="button" {...rest}>
    <Icon color="#fff" size={16} />
    {title}
  </Container>
);

export default Button;
