// import
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import Input from '../components/common/Input';
import Arrow_R from '../assets/svg/Arrow_R.svg';

// css emotion
const Page = styled.div`
  width: 100%;
  height: 100%;
  padding: 60px 0;
  margin: 0;

  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  display: flex;
  position: relative;

  background: #fff;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 41px;

  color: #000;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  width: 500px;
  height: 500px;

  border-radius: 500px;
  background: #fbf2f1;
  box-shadow: 0 0 10px 0 #d9695c;

  position: relative;
`;

// 내부 요소
const Row = styled.div`
  display: flex;
  position: relative;
  gap: 23px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const OptionText = styled.span`
  cursor: pointer;

  color: ${(props) => (props.isSelected ? '#D9695C' : '#828282')};
  font-size: ${(props) => (props.isSelected ? '28px' : '20px')};
  font-weight: ${(props) => (props.isSelected ? '700' : '500')};
`;

const Or = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 500;
`;

// 기타 - input 박스
const OtherOptionWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const OtherInputWrapper = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 15px;

  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
  white-space: nowrap;
`;

const OtherInput = styled(Input)`
  width: 186px;
  height: 40px;
  padding: 11px 19px;

  font-size: 16px;
  color: #000;
  background: #fff;

  cursor: ${(props) => (props.readOnly ? 'pointer' : 'text')};
`;

const SaveBtn = styled.button`
  background: none;
  border: none;
  padding: 0;

  color: #000;
  font-size: 16px;
  font-weight: 400;
  text-decoration-line: underline;
  cursor: pointer;

  justify-content: center;
`;

// 팟 만들기
export const TextLink = styled(Link)`
  position: absolute;
  bottom: 0;
  right: -150px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 5px;

  color: #000;
  font-size: 20px;
  font-weight: 500;

  cursor: pointer;
`;

// func.
export default function CreatedPod() {
  // === 선택 option 관리 ===
  const [mood, setMood] = useState(null);
  const [type, setType] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);

  // 기타(Other) option 관련
  const [otherText, setOtherText] = useState('');
  const [isOtherSaved, setIsOtherSaved] = useState(false);

  // === handler ===
  const handleMoodClick = (selectedMood) => {
    setMood(selectedMood);
  };

  const handleTypeClick = (selectedType) => {
    setType(selectedType);
    if (selectedType !== 'other') {
      setOtherText('');
      setIsOtherSaved(false);
    }
  };

  const handleMaxPeopleClick = (selectedMaxPeople) => {
    setMaxPeople(selectedMaxPeople);
  };

  const handleOtherSave = () => {
    if (otherText.trim().length > 0) {
      setIsOtherSaved(true);
    } else {
      alert('내용을 입력해주세요.');
    }
  };

  // 이미 저장된 상태라면 수정 모드로 전환
  const handleInputClick = () => {
    if (isOtherSaved) {
      setIsOtherSaved(false);
    }
  };
  // CreatePod_2로 넘길 데이터 1차 payload
  const step1Payload = {
    mood,
    type,
    studyTypeDetail: type === 'other' ? otherText : null,
    maxPeople,
    timestamp: new Date().toISOString(),
  };

  const handleSubmit = () => {
    console.log('(임시) CreatePod step1 payload', step1Payload);
    // 백엔드 전송은 아직 x, 2로 넘김
  };

  // 3개 선택 확인
  const isFormValid = () => {
    const isMoodSelected = mood !== null;
    const isMaxPeopleSelected = maxPeople !== null;

    let isTypeSelected = false;
    if (type === 'cafe' || type === 'zoom') {
      isTypeSelected = true;
    } else if (type === 'other') {
      // 기타 옵션 = 저장 필요
      isTypeSelected = isOtherSaved && otherText.trim().length > 0;
    }

    return isMoodSelected && isTypeSelected && isMaxPeopleSelected;
  };

  return (
    <>
      <Page>
        <Container>
          <Title>🤔 어떤 팟을 만들까?</Title>
          <Content>
            {/* StudyMood */}
            <Row>
              <OptionText
                isSelected={mood === 'chatty'}
                onClick={() => handleMoodClick('chatty')}
              >
                도란도란한
              </OptionText>
              <Or>/</Or>
              <OptionText
                isSelected={mood === 'quiet'}
                onClick={() => handleMoodClick('quiet')}
              >
                조용한
              </OptionText>
            </Row>

            {/* StudyType */}
            <Row>
              <OptionText
                isSelected={type === 'cafe'}
                onClick={() => handleTypeClick('cafe')}
              >
                카공
              </OptionText>
              <Or>/</Or>
              <OptionText
                isSelected={type === 'zoom'}
                onClick={() => handleTypeClick('zoom')}
              >
                줌공
              </OptionText>
              <Or>/</Or>
              <OtherOptionWrapper>
                <OptionText
                  isSelected={type === 'other'}
                  onClick={() => handleTypeClick('other')}
                >
                  기타
                </OptionText>
                {/* 기타 선택 -> input 나타남 */}
                {type === 'other' && (
                  <OtherInputWrapper>
                    <OtherInput
                      laebl="other.text"
                      placeholder="예) 공간 대여"
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      readOnly={isOtherSaved}
                      onClick={handleInputClick}
                    />
                    {!isOtherSaved && (
                      <SaveBtn onClick={handleOtherSave}>저장</SaveBtn>
                    )}
                  </OtherInputWrapper>
                )}
              </OtherOptionWrapper>
            </Row>
            {/* StudySize */}
            <Row>
              {[2, 3, 4, 5, 6].map((num, index) => (
                <React.Fragment key={num}>
                  <OptionText
                    isSelected={maxPeople === num}
                    onClick={() => handleMaxPeopleClick(num)}
                  >
                    {num}인
                  </OptionText>
                  {index < 4 && <Or>/</Or>}
                </React.Fragment>
              ))}
            </Row>
            {/* 조건 충족 시 '팟 만들기' 버튼 표시 (원의 우측 하단 바깥) */}
            {isFormValid() && (
              <TextLink
                to="/CreatePod_2"
                state={{ step1: step1Payload }}
                onClick={handleSubmit}
              >
                {/* 팟만들기-2페이지로 연결 */}
                팟 만들기
                <img src={Arrow_R} alt="화살표" />
              </TextLink>
            )}
          </Content>
        </Container>
      </Page>
    </>
  );
}
