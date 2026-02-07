import styled from '@emotion/styled';
import { PopupContainer, CloseButton, PopupMainText } from './style';
import Button from '../common/Button';

const ApplyPopup = ({
  setIsApplyPopupOpen,
  timeChecked,
  setTimeChecked,
  placeChecked,
  setPlaceChecked,
  podInfo,
  onConfirm,
}) => {
  return (
    <PopupContainer
      onClick={(e) => e.stopPropagation()}
      style={{ width: '600px', height: '350px' }}
    >
      <CloseButton onClick={() => setIsApplyPopupOpen(false)}>
        <img src="/pod/close.svg" alt="닫기 아이콘" />
      </CloseButton>
      <PopupMainText>
        <span>모닥모닥코</span> 팟에 참여하시겠습니까?
      </PopupMainText>
      <CheckList>
        <CheckItem>
          <Label>
            <HiddenCheckbox
              type="checkbox"
              checked={timeChecked}
              onChange={() => setTimeChecked(!timeChecked)}
            />
            <CustomCheckbox checked={timeChecked} />
          </Label>
          <PopupSubText>
            <span>{podInfo.time}</span> 시간을 확인했습니다.
          </PopupSubText>
        </CheckItem>
        <CheckItem>
          <Label>
            <HiddenCheckbox
              type="checkbox"
              checked={placeChecked}
              onChange={() => setPlaceChecked(!placeChecked)}
            />
            <CustomCheckbox checked={placeChecked} />
          </Label>
          <PopupSubText>
            <span>{podInfo.place}</span> 장소를 확인했습니다.
          </PopupSubText>
        </CheckItem>
      </CheckList>
      <ButtonWrapper>
        <Button
          shape="chip"
          size="medium"
          width="80px"
          disabled={!(timeChecked && placeChecked)}
          onClick={() => {
            setIsApplyPopupOpen(false);
            onConfirm();
          }}
        >
          신청
        </Button>
      </ButtonWrapper>
    </PopupContainer>
  );
};

export default ApplyPopup;

const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
`;

const CustomCheckbox = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${(props) => (props.checked ? '#D9695C' : '#D9D9D9')};

  &::after {
    content: '';
    width: 45%;
    height: 25%;
    border-left: 3px solid #fff;
    border-bottom: 3px solid #fff;
    transform: translateY(-2px) rotate(-45deg);
  }
`;

const PopupSubText = styled.p`
  font-size: 20px;
  font-weight: 500;

  span {
    color: #d9695c;
  }
`;

const CheckList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 75px;
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 45px;
`;
