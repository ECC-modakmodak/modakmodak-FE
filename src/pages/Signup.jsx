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

    if (name === 'passwordConfirm') {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: '다시 입력해 주세요.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, passwordConfirm: '' }));
      }
    }

    if (name === 'password') {
      if (value.length > 0 && value.length < 8) {
        setErrors((prev) => ({ ...prev, password: '8자 이상 입력해주세요.' }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    }

    if (name === 'passwordConfirm') {
      if (value === '') {
        setErrors((prev) => ({ ...prev, passwordConfirm: '' }));
      } else if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: '다시 입력해 주세요',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          passwordConfirm: '비밀번호가 일치합니다.',
        }));
      }
    }
  };

  const checkDuplicate = async (type) => {
    const value = formData[type];
    if (!value) return alert('값을 입력해주세요.');

    try {
      const isAvailable = true;
      if (isAvailable) {
        setErrors((prev) => ({
          ...prev,
          [type]: `사용 가능한 ${type === 'nickname' ? '닉네임' : '아이디'}입니다.`,
        }));
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [type]: `중복된 ${type === 'nickname' ? '닉네임' : '아이디'}입니다.`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert('회원가입이 완료되었습니다.');
    navigate('/login');
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
