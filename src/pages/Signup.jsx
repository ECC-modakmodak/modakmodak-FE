import { api } from '../lib/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Footer from '../components/layout/Footer';
import ModakLogo from '../assets/svg/logo.svg';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    preferredType: '',
    preferredMethod: '',
    activityArea: '',
    targetMessage: '',
  });

  const [errors, setErrors] = useState({
    nickname: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 입력이 시작되면 해당 필드의 에러 메시지를 지움
    if (name === 'nickname' || name === 'username') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (name === 'password') {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

      let passwordError = '';
      if (value.length > 0 && !passwordRegex.test(value)) {
        passwordError =
          '영어, 숫자, 특수문자를 포함하여 8 ~ 20자로 입력해주세요.';
      }

      let confirmError = '';
      if (formData.passwordConfirm) {
        confirmError =
          value === formData.passwordConfirm
            ? '비밀번호가 일치합니다.'
            : '다시 입력해주세요.';
      }

      setErrors((prev) => ({
        ...prev,
        password: passwordError,
        passwordConfirm: formData.passwordConfirm
          ? confirmError
          : prev.passwordConfirm,
      }));
    }

    if (name === 'passwordConfirm') {
      let confirmError = '';
      if (value === '') {
        confirmError = '';
      } else {
        confirmError =
          value === formData.password
            ? '비밀번호가 일치합니다.'
            : '다시 입력해주세요.';
      }
      setErrors((prev) => ({ ...prev, passwordConfirm: confirmError }));
    }
  };

  const checkDuplicate = async (type) => {
    const value = formData[type];

    if (!value) return alert('값을 입력해주세요.');

    if (type === 'nickname') {
      // 한글 또는 영어를 포함하는 2-10자
      const nicknameRegex = /^[a-zA-Z가-힣]{2,10}$/;
      if (!nicknameRegex.test(value)) {
        return setErrors((prev) => ({
          ...prev,
          nickname: '한글 또는 영어 2~10자로 입력해주세요.',
        }));
      }
    } else if (type === 'username') {
      // 영어, 숫자를 포함하는 4-20자
      const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
      if (!usernameRegex.test(value)) {
        return setErrors((prev) => ({
          ...prev,
          username: '영어 또는 숫자 4~20자로 입력해주세요.',
        }));
      }
    }

    const CHECK_URL =
      type === 'nickname'
        ? `api/users/check-nickname`
        : `api/users/check-username`;

    try {
      const response = await api.get(CHECK_URL, {
        params: { [type]: value },
      });

      if (response.data.isAvailable) {
        setErrors((prev) => ({
          ...prev,
          [type]:
            response.data.message ||
            `사용 가능한 ${type === 'nickname' ? '닉네임' : '아이디'}입니다.`,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [type]:
            response.data.message ||
            `이미 존재하는 ${type === 'nickname' ? '닉네임' : '아이디'}입니다.`,
        }));
      }
    } catch (err) {
      console.error(err);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'nickname',
      'username',
      'email',
      'password',
      'passwordConfirm',
      'preferredType',
      'preferredMethod',
      'activityArea',
      'targetMessage',
    ];

    const isAllFilled = requiredFields.every((field) => formData[field] !== '');

    if (!isAllFilled) {
      return alert('모든 항목을 입력해야 회원가입이 가능합니다.');
    }

    const hasError =
      (errors.nickname && !errors.nickname.includes('가능')) ||
      (errors.username && !errors.username.includes('가능')) ||
      errors.password !== '' ||
      formData.password !== formData.passwordConfirm ||
      (errors.passwordConfirm && errors.passwordConfirm.includes('다시'));

    if (hasError) {
      return alert('입력 조건을 다시 확인해 주세요.');
    }

    const typeMap = {
      조용히: 'QUIET',
      도란도란: 'CHATTY',
    };

    const methodMap = {
      대면: '대면',
      비대면: '비대면',
    };

    try {
      const response = await api.post('api/users/signup', {
        nickname: formData.nickname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        preferredType: typeMap[formData.preferredType],
        preferredMethod: methodMap[formData.preferredMethod],
        activityArea: formData.activityArea,
        targetMessage: formData.targetMessage,
      });

      if (response.status === 201 || response.status === 200) {
        alert('회원가입 성공');
        navigate('/login');
      }
    } catch (err) {
      const errorData = err.response?.data;
      console.log('에러 이유:', errorData);
      if (
        errorData?.error === 'EMAIL_ALREADY_EXISTS' ||
        errorData?.message?.includes('이메일')
      ) {
        setErrors((prev) => ({
          ...prev,
          email: errorData?.message,
        }));
        alert(errorData?.message);
      } else {
        alert(errorData?.message || '회원가입 실패');
      }
    }
  };

  return (
    <SignupContainer>
      <LogoImage src={ModakLogo} alt="모닥모닥 로고" />

      <FormWrapper>
        <RowWrapper style={{ alignItems: 'flex-start' }}>
          <Input
            label="닉네임"
            helperText={errors.nickname} // 에러가 있을 때만 보이게 함
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            width="80%"
            placeholder="한글 또는 영어를 포함하는 2-10자"
          />
          <SideButton
            type="button"
            variant="secondary"
            size="large"
            onClick={() => checkDuplicate('nickname')}
          >
            중복 확인
          </SideButton>
        </RowWrapper>

        <RowWrapper style={{ alignItems: 'flex-start' }}>
          <Input
            label="아이디"
            helperText={errors.username} // 에러가 있을 때만 보이게 함
            name="username"
            value={formData.username}
            onChange={handleChange}
            width="80%"
            placeholder="영어, 숫자를 포함하는 4-20자"
          />
          <SideButton
            type="button"
            variant="secondary"
            size="large"
            onClick={() => checkDuplicate('username')}
          >
            중복 확인
          </SideButton>
        </RowWrapper>

        <Input
          label="이메일"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          label="비밀번호"
          helperText={errors.password}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="영어, 숫자, 특수문자를 포함하는 8-20자"
        />
        <Input
          type="password"
          label="비밀번호 확인"
          helperText={errors.passwordConfirm}
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />

        <PinkBox>
          <SectionLabel>선호 팟 유형</SectionLabel>

          <TagGroupContainer>
            <SubBox>
              <PillButton
                shape="chip"
                variant={
                  formData.preferredType === '조용히' ? 'primary' : 'gray'
                }
                onClick={() =>
                  setFormData({ ...formData, preferredType: '조용히' })
                }
              >
                조용히
              </PillButton>

              <PillButton
                shape="chip"
                variant={
                  formData.preferredType === '도란도란' ? 'primary' : 'gray'
                }
                onClick={() =>
                  setFormData({ ...formData, preferredType: '도란도란' })
                }
              >
                도란도란
              </PillButton>
            </SubBox>

            <PlusIcon>+</PlusIcon>

            <SubBox>
              <PillButton
                shape="chip"
                variant={
                  formData.preferredMethod === '대면' ? 'primary' : 'gray'
                }
                onClick={() =>
                  setFormData({ ...formData, preferredMethod: '대면' })
                }
              >
                대면
              </PillButton>
              <PillButton
                shape="chip"
                variant={
                  formData.preferredMethod === '비대면' ? 'primary' : 'gray'
                }
                onClick={() =>
                  setFormData({ ...formData, preferredMethod: '비대면' })
                }
              >
                비대면
              </PillButton>
            </SubBox>
          </TagGroupContainer>

          <Input
            label="주요 활동 지역"
            name="activityArea"
            value={formData.activityArea}
            onChange={handleChange}
            placeholder="예) 대한민국, 서울시"
          />

          <Input
            label="목표"
            name="targetMessage"
            value={formData.targetMessage}
            onChange={handleChange}
            placeholder="예) 웹 개발 정복하기!"
          />
        </PinkBox>

        <SubmitButton variant="primary" size="full" onClick={handleSubmit}>
          회원가입
        </SubmitButton>
      </FormWrapper>

      <Footer />
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin-top: 51px;
  background-color: #fff;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  width: 355px;
  height: 106px;
  margin-bottom: 8px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
`;

const SideButton = styled(Button)`
  margin-top: 34px;
  white-space: nowrap;
  font-size: 16px;
`;

const PinkBox = styled.div`
  background-color: #fbf2f1;
  width: 100%;
  border-radius: 10px;
  padding: 2px 2px 18px 1px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
`;

const SectionLabel = styled.label`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  height: 34px;
  line-height: 34px;
  display: block;
`;

const TagGroupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
`;

const SubBox = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #d9695c;
  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 61px;
  gap: 4px;
  margin-bottom: 7px;
  padding: 17px 7px 17px 6px;
`;

const PlusIcon = styled.span`
  font-size: 20px;
  font-weight: 400;
  color: #000;
`;

const PillButton = styled(Button)`
  min-width: 0;
  flex: 1;
  height: 27px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  padding: 9px 22px !important;
  box-shadow: none !important;
  white-space: nowrap;
`;

const SubmitButton = styled(Button)`
  margin-top: 61px;
  margin-bottom: 61px;
`;
