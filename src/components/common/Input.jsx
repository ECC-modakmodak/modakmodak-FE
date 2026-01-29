import styled from '@emotion/styled';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${(props) => props.width || '100%'};
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  height: 34px;
  font-size: 16px;
  color: #000;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  width: ${(props) => props.width || '100%'};
  height: 61px;
  padding: 0 16px;
  border: 1px solid #D9695C;
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  background-color: #FFF;

  &::placeholder {
    color: #A5A5A5;
    font-weight: 400;
  }

  &:focus {
    border-color: #D9695C;
  }
`;

const HelperText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-top: 4px;
  color: #D9695C;
`;

const Input = ({ label, helperText, error, width, ...props }) => {
  return (
    <InputWrapper width={width}>
      {label && <Label>{label}</Label>}
      <StyledInput error={error} {...props} />
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </InputWrapper>
  );
};

export default Input;