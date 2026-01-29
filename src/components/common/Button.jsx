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
  
  ${(props) => {
    if (props.variant === 'chip') {
      return `
        height: 43px;
        padding: 9px 22px;
        gap: 10px;
        border-radius: 100px;
        font-size: 20px;
        font-weight: 600;
        width: auto;
      `;
    }

    switch (props.size) {
      case 'medium':
        return `
          height: 40px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 10px;
          width: auto;
          padding: 0 20px;
        `;
      case 'small':
        return `
          height: 61px;
          font-size: 16px;
          font-weight: 400;
          border-radius: 10px;
          width: auto;
          padding: 0 16px;
        `;
      default:
        return `
          height: 61px;
          font-size: 20px;
          font-weight: 500;
          border-radius: 10px;
          width: 100%;
          padding: 0 16px;
        `;
    }
  }};

  background-color: ${(props) => {
    if (props.variant === 'gray') return '#D9D9D9';
    if (props.variant === 'secondary') return '#FBF2F1';
    if (props.variant === 'chip') return props.bgColor || '#D9695C';
    return '#D9695C';
  }};

  color: ${(props) => {
    if (props.variant === 'gray') return '#000';
    if (props.variant === 'secondary') return '#D9695C';
    return '#FFF';
  }};

  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }

  border: ${(props) => (props.variant === 'secondary' ? '1px solid #D9695C' : 'none')};
  `;

  const Button = ({ children, size = 'large', variant = 'primary', bgColor, ...props}) => {
    return (
      <StyledButton size={size} variant={variant} bgColor={bgColor} {...props}>
        {children}
      </StyledButton>
    );
  };

  export default Button;