import styled from '@emotion/styled';
import Button from '../common/Button';
import { PopupContainer, PopupMainText, CloseButton } from './style';

const ApplyConfirmPopup = ({ setIsApplyConfirmPopupOpen }) => {
  return (
    <PopupContainer
      onClick={(e) => e.stopPropagation()}
      style={{ width: '600px', height: '350px' }}
    >
      <CloseButton onClick={() => setIsApplyConfirmPopupOpen(false)}>
        <img src="/pod/close.svg" alt="닫기 아이콘" />
      </CloseButton>
      <PopupMainText style={{ marginTop: '100px' }}>
        신청이 완료되었습니다!
        <br />
        팟장의 승인을 기다려주세요.
      </PopupMainText>
      <ButtonWrapper>
        <Button
          shape="chip"
          size="medium"
          width="80px"
          onClick={() => setIsApplyConfirmPopupOpen(false)}
        >
          확인
        </Button>
      </ButtonWrapper>
    </PopupContainer>
  );
};

export default ApplyConfirmPopup;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;
