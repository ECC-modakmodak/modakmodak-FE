import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '../components/common/Button';
import ModakLogo from '../assets/svg/logo.svg';

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <OnboardingContainer>
      <ContentWrapper>
        <LogoWrapper>
          <LogoImage src={ModakLogo} alt="모닥모닥 메인 로고" />
        </LogoWrapper>

        <ButtonArea>
          <Button
            shape="rect"
            size="large"
            variant="primary"
            onClick={() => navigate('/login')}
          >
            로그인
          </Button>
          <Button
            shape="rect"
            size="large"
            variant="gray"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </Button>
        </ButtonArea>
      </ContentWrapper>
    </OnboardingContainer>
  );
}

const OnboardingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 9px;
  width: 100%;
  max-width: 450px;
`;

const LogoWrapper = styled.div`
  margin-top: 28vh;
  margin-bottom: 10vh;
  display: flex;
  align-items: center;
  width: 80%;
  max-width: 300%;
  justify-content: center;
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 160px;
  margin-bottom: 5vh;

  & > button {
    padding: 10px 12px;
    word-break: keepall;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  & > button:first-of-type {
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: #e59990;
    }
  }

  & > button:last-of-type {
    transition: all 0.2s ease-in-out;
    &:hover {
      background-color: #e6e6e6;
    }
  }
`;
