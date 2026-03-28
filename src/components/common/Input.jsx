import styled from '@emotion/styled';
import { useState } from 'react';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${(props) => props.width || '100%'};
  margin-bottom: 7px;
  gap: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  height: 34px;
  color: #000;
  font-size: ${(props) => props.fontSize || '12px'};
  font-weight: ${(props) => props.fontWeight || '400'};
  margin-bottom: ${(props) => props.labelGap || '0'};
`;

const InputRow = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  /* 팟 만들기(50px), 회원가입(61px), 기타(40px) */
  height: ${(props) => props.height || '61px'};
  /* 회원가입(13/20), 팟 만들기(14/23), 기타(11/19) */
  padding: ${(props) => props.padding || '13px 20px'};
  padding-right: ${(props) =>
    props.hasClearBtn || props.hasToggleBtn
      ? '48px'
      : props.padding?.split(' ')[1] || '20px'};

  border: 1px solid ${(props) => (props.hasHelperText ? '#D9695C' : '#000')};
  border-radius: 10px;
  box-sizing: border-box;
  outline: none;
  font-family: inherit;
  font-size: ${(props) => props.fontSize || '12px'};
  font-weight: ${(props) => props.fontWeight || '400'};
  color: #000;
  background-color: #fff;

  &::placeholder {
    color: ${(props) => (props.variant === 'black' ? '#D9D9D9' : '#A5A5A5')};
    font-weight: 400;
  }

  &:focus {
    border: 1px solid ${(props) => (props.hasHelperText ? '#D9695C' : '#000')};
  }
`;

const IconButton = styled.button`
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #535353;

  &:hover {
    color: #000;
  }
`;

const ClearButton = styled(IconButton)`
  right: 14px;
`;

const ToggleButton = styled(IconButton)`
  right: ${(props) => (props.hasClearBtn ? '45px' : '14px')};
`;

const HelperText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 12px;
  font-weight: 400;
  margin-top: 4px;
  height: 27px;
  display: flex;
  align-items: center;
  color: #d9695c;
`;

export default function Input({
  label,
  labelGap,
  helperText,
  width,
  height,
  padding,
  fontSize,
  fontWeight,
  variant,
  clearable,
  showPasswordToggle,
  onChange,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClear = () => {
    onChange?.({ target: { name: props.name, value: '' } });
  };

  const inputType = showPasswordToggle
    ? showPassword
      ? 'text'
      : 'password'
    : props.type;

  const hasValue = !!props.value;

  return (
    <InputWrapper width={width}>
      {label && (
        <Label fontSize={fontSize} fontWeight={fontWeight} labelGap={labelGap}>
          {label}
        </Label>
      )}

      <InputRow>
        <StyledInput
          {...props}
          type={inputType}
          height={height}
          padding={padding}
          fontSize={fontSize}
          fontWeight={fontWeight}
          variant={variant}
          hasHelperText={!!helperText}
          hasClearBtn={clearable}
          hasToggleBtn={showPasswordToggle}
          onChange={onChange}
        />

        {clearable && hasValue && (
          <ClearButton type="button" onClick={handleClear} tabIndex={-1}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18"
                stroke="#535353"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#535353"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ClearButton>
        )}

        {showPasswordToggle && (
          <ToggleButton
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            hasClearBtn={clearable && hasValue}
          >
            {showPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </ToggleButton>
        )}
      </InputRow>

      {helperText && <HelperText>{helperText}</HelperText>}
    </InputWrapper>
  );
}
