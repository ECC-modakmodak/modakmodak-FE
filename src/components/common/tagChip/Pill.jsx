import styled from '@emotion/styled';
import { PILL_CONFIG } from '../../../constants/PILL_CONFIG';
import { PillShape } from './PillShape';

const PillBase = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  cursor: pointer;

  ${PillShape}
`;

export default function Pill({
  variant, // badge, remind, mood, type, today
  state,
  children,
  ...props
}) {
  const size = PILL_CONFIG.sizes[variant];
  const style =
    PILL_CONFIG.styles[variant][state] ||
    PILL_CONFIG.styles[variant]['default'];

  return (
    <PillBase
      $padding={size.padding}
      $fontSize={size.fontSize}
      $bg={style.bg}
      $color={style.color}
      $border={style.border}
      {...props}
    >
      {children}
    </PillBase>
  );
}
