import styled from "@emotion/styled";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  line-height: normal;
  text-align: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.1s ease;
  
  ${({shape, size}) => {
    // 알약 형태 버튼 (회고 마무리, 홈 화면의 확인하기 등)
    if(shape === 'chip') {
      return `
        height: ${size === 'large' ? '50px' : '39px'};
        padding: ${size === 'large' ? '10px 20px' : '0 0'};
        border-radius: 100px;
        box-shadow: 0 0 ${size === 'large' ? '10px' : '7px'} rgba(0, 0, 0, 0.25);
        font-size: ${size === 'large' ? '24px' : '20px'};
        font-weight: ${size === 'large' ? '600' : '400'};
        width: auto;
      `;
    }
    // 기본 사각 형태 (로그인, 회원가입, 중복확인 등)
    return `
      height: ${size === 'slim' ? '40px' : '61px'};
      border-radius: 10px;
      width: ${size === 'full' ? '100%' : 'auto'};
    `;
  }}

  background-color: ${({variant, bgColor}) => {
    if(bgColor) return bgColor;
    switch (variant) {
      case 'gray': return '#D9D9D9';
      case 'secondary': return '#FBF2F1';
      case 'white': return '#FFF';
      default: return '#D9695C';
    }
  }}

  color: ${({variant}) => {
    if (variant === 'gray' || variant === 'white') return '#000';
    if (variant === 'secondary') return '#D9695C';
    return '#FFF';
  }};

  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }

  border: ${({variant}) => (variant === 'secondary' ? '1px solid #D9695C' : 'none')};
  font-size: ${({fontSize}) => fontSize || '16px'};
  font-weight: ${({fontWeight}) => fontWeight || '500'};
  `;

 

  const Button = ({ children, shape = 'rect', size = 'large', variant = 'primary', fontSize, fontWeight, bgColor, ...props}) => {
    return (
      <StyledButton shape={shape} size={size} variant={variant} fontSize={fontSize} fontWeight={fontWeight} bgColor={bgColor} {...props}>
        {children}
      </StyledButton>
    );
  };

  export default Button;