import styled from '@emotion/styled';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
  font-family: 'Pretendard', sans-serif;
  text-align: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.1s ease;

  ${({ shape, size, height, fontSize, fontWeight, padding }) => {
    const styleDefaults = {
      chip: {
        // 회고 마무리 버튼
        large: { h: '50px', fz: '20px', fw: '600', p: '10px 20px' },
        // 팝업 버튼
        medium: { h: '50px', fz: '16px', fw: '400', p: '13px 23px' },
        // 홈 화면 확인하기 버튼
        small: { h: '39px', fz: '16px', fw: '400', p: '0 0' },
      },
      rect: {
        large: { h: '61px', fz: '16px', fw: '500', p: '0 20px' },
        // 참여 신청하기 버튼
        slim: { h: '40px', fz: '10px', fw: '500', p: '0 20px' },
        full: { h: '61px', fz: '16px', fw: '500', p: '0 20px' },
      },
    };

    const config = styleDefaults[shape]?.[size] || styleDefaults.rect.large;

    const finalHeight = height || config.h;
    const finalFontSize = fontSize || config.fz;
    const finalFontWeight = fontWeight || config.fw;
    const finalPadding = padding || config.p;

    // 알약 형태 버튼 (회고 마무리, 홈 화면의 확인하기 등)
    if (shape === 'chip') {
      return `
        height: ${finalHeight};
        font-size: ${finalFontSize};
        font-weight: ${finalFontWeight};
        padding: ${finalPadding};
        border-radius: 100px;
        box-shadow: 0 0 ${size === 'medium' ? '0' : size === 'large' ? '10px' : '7px'} rgba(0, 0, 0, 0.25);
        width: auto;
      `;
    }
    // 기본 사각 형태 (로그인, 회원가입, 중복확인 등)
    return `
      height: ${finalHeight};
      font-size: ${finalFontSize};
      font-weight: ${finalFontWeight};
      padding: ${finalPadding};
      border-radius: 10px;
      width: ${size === 'full' || size === 'slim' ? '100%' : 'auto'};
    `;
  }}

  background-color: ${({ variant, bgColor }) => {
    if (bgColor) return bgColor;
    const colors = { gray: '#D9D9D9', secondary: '#FBF2F1', white: '#FFF' };
    return colors[variant] || '#D9695C';
  }};

  color: ${({ variant }) => {
    if (variant === 'gray' || variant === 'white') return '#000';
    if (variant === 'secondary') return '#D9695C';
    return '#FFF';
  }};

  border: ${({ variant }) =>
    variant === 'secondary' ? '1px solid #D9695C' : 'none'};

  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

export default function Button({
  children,
  shape = 'rect',
  size = 'large',
  variant = 'primary',
  ...props
}) {
  return (
    <StyledButton shape={shape} size={size} variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
