import axios from 'axios';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const API_URL = `${import.meta.env.VITE_API_URL}/api/users/login`;

    try {
      const response = await axios.post(API_URL, {
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

  const handleGoogleLogin = () => {
    console.log('Google 로그인 시도');
    // TODO: Google 로그인 로직 구현
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

        <ForgotPasswordLink href="#">아이디 / 비밀번호 찾기</ForgotPasswordLink>

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
  justify-content: space-betwwen;
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

const ForgotPasswordLink = styled.a`
  font-size: 16px;
  color: #a5a5a5;
  align-self: flex-end;
  margin-bottom: 40px;
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
