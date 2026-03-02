import styled from '@emotion/styled';
import Button from '../common/Button';
import { PopupContainer, PopupMainText, CloseButton } from './style';

const CloseConfirmPopup = ({ setIsCloseConfirmPopupOpen }) => {
  return (
    <PopupContainer
      onClick={(e) => e.stopPropagation()}
      style={{ width: '600px', height: '350px' }}
    >
      <CloseButton onClick={() => setIsCloseConfirmPopupOpen(false)}>
        <img src="/pod/close.svg" alt="닫기 아이콘" />
      </CloseButton>
      <PopupMainText style={{ marginTop: '100px' }}>
        팟 모집이 종료되었습니다.
        <br />
        오늘도 파이팅!
      </PopupMainText>
      <ButtonWrapper>
        <Button
          shape="chip"
          size="medium"
          width="80px"
          onClick={() => setIsCloseConfirmPopupOpen(false)}
        >
          확인
        </Button>
      </ButtonWrapper>
    </PopupContainer>
  );
};

export default CloseConfirmPopup;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;
