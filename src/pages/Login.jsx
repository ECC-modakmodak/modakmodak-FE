import { api } from '../lib/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Footer from '../components/layout/Footer';
import ModakLogo from '../assets/svg/logo.svg';

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFindIdLink = (e) => {
    e.preventDefault();
    navigate('/find-id');
  };

  const handleFindPwLink = (e) => {
    e.preventDefault();
    navigate('/find-pw');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        console.log('로그인 성공 응답 데이터:', response.data);

        const token = response.data.token;
        if (token) localStorage.setItem('userToken', token);

        navigate('/home');
      }
    } catch (err) {
      console.error('로그인 에러: ', err.response?.data);
      const errorMsg =
        err.response?.data?.message || '아이디 또는 비밀번호가 틀렸습니다.';
      alert(errorMsg);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleGoogleLogin = async (googleIdToken) => {
    try {
      const response = await api.post('/users/login/google', {
        idToken: googleIdToken,
      });

      if (response.status === 200) {
        const userData = response.data.user;
        localStorage.setItem('user', JSON.stringify(userData));

        alert(`로그인 성공`);
        navigate('/');
      }
    } catch (err) {
      const errorData = err.response?.data;

      if (
        err.response?.status === 401 &&
        errorData?.error === 'INVALID_TOKEN'
      ) {
        alert(
          errorData.message || 'Google 로그인 실패: 유효하지 않은 토큰입니다.',
        );
      } else {
        console.error('구글 로그인 통신 에러:', errorData);
      }
    }
  };

  return (
    <LoginContainer>
      <ContentWrapper>
        <LogoImage src={ModakLogo} alt="모닥모닥 로고" />
        <InputWrapper>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            label="아이디"
            size="large"
            fullWidth
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            label="비밀번호"
            size="large"
            fullWidth
            showPasswordToggle
          />
        </InputWrapper>
        <FindLinksWrapper>
          <ForgotLink href="#" onClick={handleFindIdLink}>
            아이디
          </ForgotLink>
          <SeparatorText>/</SeparatorText>
          <ForgotLink href="#" onClick={handleFindPwLink}>
            비밀번호 찾기
          </ForgotLink>
        </FindLinksWrapper>

        <ButtonWrapper>
          <Button
            shape="rect"
            size="full"
            variant="primary"
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Button
            shape="rect"
            size="full"
            variant="gray"
            onClick={handleSignup}
          >
            회원가입
          </Button>
          <Separator>또는</Separator>
          <Button
            shape="rect"
            size="full"
            variant="gray"
            onClick={handleGoogleLogin}
          >
            <GoogleLogo
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
              alt="Google 로고"
            />
            Google로 로그인하기
          </Button>
        </ButtonWrapper>
      </ContentWrapper>

      <Footer />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  background-color: #fff;
  margin: 0 !important;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 60px 20px;
  flex-grow: 1;
`;

const LogoImage = styled.img`
  width: 355px;
  height: 106px;
  aspect-ratio: 355 / 106;
  object-fit: contain;
  margin-bottom: 44px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-top: 3px;
  margin-bottom: 4px;
`;

const FindLinksWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 8px;
`;

const ForgotLink = styled.a`
  font-size: 16px;
  color: #a5a5a5;
  margin-bottom: 40px;

  &:hover {
    text-decoration: underline;
  }
`;

const SeparatorText = styled.span`
  font-size: 16px;
  color: #a5a5a5;
  user-select: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const Separator = styled.div`
  text-align: center;
  font-size: 16px;
  color: #000;
  margin: 0;
  position: relative;
`;

const GoogleLogo = styled.img`
  width: 30px;
  height: 30px;
  aspect-ratio: 1 / 1;
  margin-right: 16px;
`;
