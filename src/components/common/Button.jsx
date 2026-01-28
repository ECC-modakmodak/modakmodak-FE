import styled from "@emotion/styled";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 10px;
  box-sizing: border-box;
  white-space: nowrap;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.1s ease;
  
  height: 61px;
  width: ${(props) => (props.size === 'small' ? '105px' : '100%')};

  background-color: ${(props) => {
    if (props.variant === 'gray') return '#D9D9D9';
    if (props.variant === 'secondary') return '#FBF2F1';
    return '#D9695C';
  }};

  color: ${(props) => {
    if (props.variant === 'gray') return '#000';
    if (props.variant === 'secondary') return '#D9695C';
    return '#FFF';
  }};

  font-size: ${(props) => (props.size === 'small' ? '16px' : '20px')};

  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }

  border: ${(props) => (props.variant === 'secondary' ? '1px solid #D9695C' : 'none')};
  `;

  const Button = ({ children, size = 'large', variant = 'primary', ...props}) => {
    return (
      <StyledButton size={size} variant={variant} {...props}>
        {children}
      </StyledButton>
    );
  };

  export default Button;