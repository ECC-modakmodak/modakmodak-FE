import { css } from 'styled-components';

export const PillShape = css`
  border-radius: 100px;
  color: #fff;
  line-height: 1;

  padding: ${({ $padding }) => $padding};
  font-size: ${({ $fontSize }) => $fontSize};
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color ?? '#fff'};
  border: ${({ $border }) => $border ?? 'none'};
`;
