import styled from '@emotion/styled';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${(props) => props.width || '100%'};
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  height: 34px;
  color: #000;
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: ${(props) => props.fontWeight || '400'};
  margin-bottom: 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  /* 팟 만들기(50px), 회원가입(61px), 기타(40px) */
  height: ${(props) => props.height || '61px'};
  /* 회원가입(13/20), 팟 만들기(14/23), 기타(11/19) */
  padding: ${(props) => props.padding || '13px 20px'};

  border: 1px solid ${(props) => props.variant === 'black' ? '#000' : '#D9695C'};
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  font-family: inherit;
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: ${(props) => props.fontWeight || '400'};
  color: #000;
  background-color: #FFF;

  &::placeholder {
    color: ${(props) => props.variant === 'black' ? '#D9D9D9' :'#A5A5A5'};
    font-weight: 400;
  }

  &:focus {
    border-color: ${(props) => props.variant === 'black' ? '#000' : '#D9695C'};
  }
`;

const HelperText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-top: 4px;
  color: #D9695C;
`;

export default function Input({ label, helperText, width, height, padding, fontSize, fontWeight, variant, ...props}) {
  return (
    <InputWrapper width={width}>
      {label && (
        <Label fontSize={fontSize} fontWeight={fontWeight}>
          {label}
        </Label>
      )}

      <StyledInput
        height={height}
        padding={padding}
        fontSize={fontSize}
        fontWeight={fontWeight}
        variant={variant}
        {...props}
      />

      {helperText && <HelperText>{helperText}</HelperText>}
    </InputWrapper>
  );
}