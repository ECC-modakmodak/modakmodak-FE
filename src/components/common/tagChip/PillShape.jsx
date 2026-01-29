import { css } from '@emotion/react';

export const PillShape = (props) => css`
  border-radius: 100px;
  color: #fff;
  line-height: 1;

  padding: ${props.$padding};
  font-size: ${props.$fontSize};
  background-color: ${props.$bg};
  color: ${props.$color ?? '#fff'};
  border: ${props.$border ?? 'none'};
`;
