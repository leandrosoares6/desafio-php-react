import React, {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react';

import { IconType } from 'react-icons';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  Icon?: IconType;
};

const Button: ForwardRefRenderFunction<unknown, ButtonProps> = ({
  Icon,
  children,
  title,
  ...rest
}) => (
  <Container type="button" {...rest}>
    {Icon && <Icon color="#fff" size={16} />}
    {title}
    {children}
  </Container>
);

export default forwardRef(Button);
