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
  min-height: 100vh;
  background-color: #fff;
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
  margin-top: 200px;
  margin-bottom: 70px;
  display: flex;
  align-items: center;
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
  width: 160px;
`;
