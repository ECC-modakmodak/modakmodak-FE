import styled from '@emotion/styled';
import { PillShape } from './PillShape';

const PillBase = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  cursor: pointer;

  ${PillShape}
  ${({ variant, backgroundColor }) => {
    if (variant === 'filled') {
      return `
        color: #fff;
        background-color: ${backgroundColor};
        border: none;
      `;
    } else if (variant === 'outlined') {
      return `
        color: #D9695C;
        background-color: #fff;
        border: 1px solid #D9695C;
      `;
    }
  }}
`;

const PILL_SIZES = {
  large: {
    padding: '2px 15px',
    fontSize: '24px',
  },
  medium: {
    padding: '9px 22px',
    fontSize: '20px',
  },
  small: {
    padding: '3px 8px',
    fontSize: '14px',
  },
};

export default function Pill({
  variant, // filled, outlined
  size, // large, medium, small, tiny
  backgroundColor,
  children,
  ...props
}) {
  return (
    <PillBase
      variant={variant}
      backgroundColor={backgroundColor}
      $padding={PILL_SIZES[size].padding}
      $fontSize={PILL_SIZES[size].fontSize}
      {...props}
    >
      {children}
    </PillBase>
  );
}
