import styled from '@emotion/styled';
import { PopupContainer, PopupMainText, CloseButton } from './style';
import Button from '../common/Button';
import { closePod } from '../../api/PodDetailApi';

const PodClosePopup = ({ setIsClosePopupOpen, podId, onCompleted }) => {
  return (
    <PopupContainer
      onClick={(e) => e.stopPropagation()}
      style={{ width: '600px', height: '350px' }}
    >
      <CloseButton onClick={() => setIsClosePopupOpen(false)}>
        <img src="/pod/close.svg" alt="닫기 아이콘" />
      </CloseButton>
      <PopupMainText style={{ marginTop: '100px' }}>
        팟 모집을 종료하시겠습니까?
        <br />더 이상 팟리스트에 노출되지 않습니다.
      </PopupMainText>
      <ButtonWrapper>
        <Button
          shape="chip"
          size="medium"
          width="80px"
          onClick={async () => {
            try {
              await closePod(podId);
              setIsClosePopupOpen(false);
              onCompleted(true);
            } catch (error) {
              console.error('Failed to close pod:', error);
            }
          }}
        >
          확인
        </Button>
        <Button
          shape="chip"
          size="medium"
          width="80px"
          variant="secondary"
          onClick={() => setIsClosePopupOpen(false)}
        >
          취소
        </Button>
      </ButtonWrapper>
    </PopupContainer>
  );
};

export default PodClosePopup;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
  gap: 33px;
`;
