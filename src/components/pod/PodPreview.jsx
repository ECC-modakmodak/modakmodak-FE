import styled from '@emotion/styled';
import StudyMood from '../common/tagChip/StudyMood';
import StudyType from '../common/tagChip/StudyType';
import { useState } from 'react';

export default function PodPreview({
  podImage,
  podName,
  location,
  currentPeople,
  maxPeople,
  description,
  studyMood,
  studyType,
  time,
  place,
  isEditMode,
  onInputChange,
  isHost,
}) {
  const [updatedField, setUpdatedField] = useState({
    time: false,
    place: false,
  });
  const [originalField, setOriginalField] = useState('');

  const handleFocus = (e) => {
    setOriginalField(e.target.value);
  };

  const handleBlurOrEnter = (e) => {
    const { name, value } = e.target;
    if (value !== originalField) {
      setUpdatedField((prev) => ({
        ...prev,
        [name]: true,
      }));
    }
    e.target.blur();
  };

  const handleEditClick = (field) => {
    setUpdatedField((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  return (
    <PodPreviewContainer>
      <ImageWrapper>
        <img src={podImage} alt="팟 이미지" />
      </ImageWrapper>
      <div>
        <PodName>{podName}</PodName>
        <div>
          <PodPreviewInfoContainer>
            <div>
              <img src="/pod/location.svg" alt="위치 아이콘" />
              <span>{location}</span>
            </div>
            <div>
              <img src="/pod/member.svg" alt="인원 아이콘" />
              <span>
                {currentPeople}/{maxPeople}
              </span>
            </div>
          </PodPreviewInfoContainer>
        </div>
        <PodPreviewText>
          <span>{description}</span>
        </PodPreviewText>
        <TagContainer>
          <StudyMood type={studyMood} />
          <StudyType type={studyType} />
        </TagContainer>
        <PodDetailInfoContainer>
          <PodDetailInfoItem $isEditMode={isEditMode}>
            <IconWrapper>
              <img src="/pod/time.svg" alt="시간 아이콘" />
              {isHost && updatedField?.time && <StatusDot />}
            </IconWrapper>
            <EditContainer>
              <EditInput
                name="time"
                value={time}
                onChange={onInputChange}
                $isUpdated={updatedField?.time}
                onFocus={handleFocus}
                onBlur={handleBlurOrEnter}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleBlurOrEnter(e);
                  }
                }}
              />
              {isHost && (
                <EditButton onClick={() => handleEditClick('time')}>
                  수정
                </EditButton>
              )}
            </EditContainer>
          </PodDetailInfoItem>
          <PodDetailInfoItem $isEditMode={isEditMode}>
            <IconWrapper>
              <img src="/pod/place.svg" alt="장소 아이콘" />
              {isHost && updatedField?.place && <StatusDot />}
            </IconWrapper>
            <EditContainer>
              <EditInput
                name="place"
                value={place}
                onChange={onInputChange}
                $isUpdated={updatedField?.place}
                onFocus={handleFocus}
                onBlur={handleBlurOrEnter}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleBlurOrEnter(e);
                  }
                }}
              />
              {isHost && (
                <EditButton onClick={() => handleEditClick('place')}>
                  수정
                </EditButton>
              )}
            </EditContainer>
          </PodDetailInfoItem>
        </PodDetailInfoContainer>
      </div>
    </PodPreviewContainer>
  );
}

const PodPreviewContainer = styled.div`
  width: 200px;
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 30px;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

const StatusDot = styled.div`
  position: absolute;
  top: 1px;
  left: -1px;
  width: 10px;
  height: 10px;
  background-color: #d9695c;
  border-radius: 50%;
  border: 1px solid #fff;
`;

const PodName = styled.h1`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const PodPreviewInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 15px;

  div {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 16px;
    font-weight: 400;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const PodPreviewText = styled.div`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 25px;
`;

const PodDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const PodDetailInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 16px;
  font-weight: 400;

  input {
    color: ${(props) => (props.$isEditMode ? '#D9695C' : '#000')};
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const EditContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

const EditInput = styled.input`
  flex: 0 1 auto;
  width: ${(props) => props.value.length + 2}ch;
  border: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  background: transparent;
  padding: 0;
  color: ${(props) => (props.$isUpdated ? '#D9695C' : '#000')};

  &:focus {
    border-bottom: 1px solid #828282;
  }
`;

const EditButton = styled.button`
  flex-shrink: 0;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  color: #828282;
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
`;
