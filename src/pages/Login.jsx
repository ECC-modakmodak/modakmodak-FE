import { GoogleLogin } from '@react-oauth/google';
import { loginUser, loginWithGoogle } from '../api/auth';
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
      const data = await loginUser(formData.username, formData.password);

      localStorage.setItem('userToken', data.token);

      // [추가] username/nickname
      localStorage.setItem('username', data.username);
      localStorage.setItem('nickname', data.nickname);

      alert(`로그인 성공`);
      navigate('/');
    } catch (err) {
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
      const data = await loginWithGoogle(googleIdToken);

      if (data.token) {
        localStorage.setItem('userToken', data.token);
        alert(`로그인 성공`);
        navigate('/');
      }
    } catch (err) {
      const errorData = err.response?.data;
      console.error('구글 로그인 에러:', errorData);

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

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            width="380"
            use_fedcm_for_prompt={true}
          />
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
  padding: 60px 10px;
  flex-grow: 1;
  box-sizing: border-box;
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
  align-items: center;

  & > button {
    width: 100%;
  }

  & > div {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;

    iframe {
      width: 100% !important;
      margin: 0 auto !important;
    }
  }
`;

const Separator = styled.div`
  text-align: center;
  font-size: 16px;
  color: #000;
  margin: 0;
  position: relative;
`;
