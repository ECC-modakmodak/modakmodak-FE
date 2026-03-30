// import

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { postSetupPod1 } from '../api/CreatePod';

import ArrowBtn from '../assets/svg/ArrowBtn.svg';

// === Swiper 관련 import 추가 ===
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Phill from '../components/common/tagChip/Pill';

// css
import {
  Page,
  Container,
  Title,
  Content,
  Row,
  OptionText,
  Or,
  OtherOptionWrapper,
  OtherInputWrapper,
  OtherInput,
  SaveBtn,
  TextLink,
  CategoryWrapper,
} from '../styles/CreatePod.style';

// 카테고리 매핑 데이터
const POD_DATA = [
  { type: 'title', label: '팟 카테고리 선택' },
  {
    type: 'category',
    label: '#시험대비',
    value: 'EXAMS',
    bgColor: 'rgba(255, 187, 13, 0.55)',
  },
  {
    type: 'category',
    label: '#과제팀플',
    value: 'PROJECTS',
    bgColor: 'rgba(0, 159, 40, 0.55)',
  },
  {
    type: 'category',
    label: '#프로그래밍',
    value: 'CODING',
    bgColor: 'rgba(255, 72, 0, 0.55)',
  },
  {
    type: 'category',
    label: '#어학',
    value: 'LANGUAGES',
    bgColor: 'rgba(66, 204, 155, 0.55)',
  },
  {
    type: 'category',
    label: '#자격증',
    value: 'CERTS',
    bgColor: 'rgba(255, 9, 13, 0.55)',
  },
  {
    type: 'category',
    label: '#취업준비',
    value: 'JOBS',
    bgColor: 'rgba(34, 67, 251, 0.55)',
  },
  {
    type: 'category',
    label: '#독서',
    value: 'READING',
    bgColor: 'rgba(255, 114, 231, 0.55)',
  },
  {
    type: 'category',
    label: '#자기계발',
    value: 'GROWTH',
    bgColor: 'rgba(165, 165, 165, 0.55)',
  },
];

// func.
export default function CreatedPod() {
  // === 선택 option 관리 ===
  const [mood, setMood] = useState(null);
  const [type, setType] = useState(null);
  const [maxPeople, setMaxPeople] = useState(null);

  // === 카테고리 상태 ===
  const [category, setCategory] = useState(null);

  // 기타(Other) option 관련
  const [otherText, setOtherText] = useState('');
  const [isOtherSaved, setIsOtherSaved] = useState(false);

  const navigate = useNavigate();

  // === handler ===
  const handleMoodClick = (selectedMood) => {
    setMood(selectedMood);
  };

  const handleTypeClick = (selectedType) => {
    setType(selectedType);
    if (selectedType !== 'OTHER') {
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

  // [POST]
  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      console.log('보낼 것', { mood, type, otherText, maxPeople, category }); // test
      const meetingId = await postSetupPod1({
        mood,
        type,
        otherText,
        maxPeople,
        category,
      });

      console.log('meetingId:', meetingId);
      console.log('서버', { mood, type, otherText, maxPeople, category }); // test

      navigate(`/create/detail/${meetingId}`, { state: { type } });
    } catch (error) {
      console.error('팟 만들기(step1) 실패:', error);
    }
  };

  // 4개 선택 확인
  const isFormValid = () => {
    const isMoodSelected = mood !== null;
    const isMaxPeopleSelected = maxPeople !== null;
    const isCategorySelected = category !== null; // 카테고리 확인 추가

    let isTypeSelected = false;
    if (type === 'CAFE' || type === 'ZOOM') {
      isTypeSelected = true;
    } else if (type === 'OTHER') {
      // 기타 옵션 = 저장 필요
      isTypeSelected = isOtherSaved && otherText.trim().length > 0;
    }

    return (
      isMoodSelected &&
      isTypeSelected &&
      isMaxPeopleSelected &&
      isCategorySelected
    );
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
                isSelected={mood === 'CHATTY'}
                onClick={() => handleMoodClick('CHATTY')}
              >
                도란도란한
              </OptionText>
              <Or>/</Or>
              <OptionText
                isSelected={mood === 'QUIET'}
                onClick={() => handleMoodClick('QUIET')}
              >
                조용한
              </OptionText>
            </Row>

            {/* StudyType */}
            <Row>
              <OptionText
                isSelected={type === 'CAFE'}
                onClick={() => handleTypeClick('CAFE')}
              >
                카공
              </OptionText>
              <Or>/</Or>
              <OptionText
                isSelected={type === 'ZOOM'}
                onClick={() => handleTypeClick('ZOOM')}
              >
                줌공
              </OptionText>
              <Or>/</Or>
              <OtherOptionWrapper>
                <OptionText
                  isSelected={type === 'OTHER'}
                  onClick={() => handleTypeClick('OTHER')}
                >
                  기타
                </OptionText>
                {/* 기타 선택 -> input 나타남 */}
                {type === 'OTHER' && (
                  <OtherInputWrapper>
                    <OtherInput
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
            {/* === swiper 위치 === */}
            <Row>
              <CategoryWrapper>
                <button className="custom-prev">
                  <img
                    src={ArrowBtn}
                    alt="이전"
                    style={{ transform: 'rotate(180deg)' }}
                  />
                </button>
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: '.custom-prev',
                    nextEl: '.custom-next',
                  }}
                  allowTouchMove={false}
                  loop={false}
                  slidesPerView={1}
                  spaceBetween={10}
                  onSlideChange={(swiper) => {
                    const currentData = POD_DATA[swiper.activeIndex];
                    setCategory(
                      currentData.type === 'title' ? null : currentData.value,
                    );
                  }}
                >
                  {POD_DATA.map((item, index) => (
                    <SwiperSlide key={index}>
                      {item.type === 'title' ? (
                        <span
                          style={{
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#000',
                            cursor: 'default',
                          }}
                        >
                          {item.label}
                        </span>
                      ) : (
                        <Phill
                          variant="filled"
                          size="small"
                          backgroundColor={item.bgColor}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.label}
                        </Phill>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button className="custom-next">
                  <img src={ArrowBtn} alt="다음" />
                </button>
              </CategoryWrapper>
            </Row>
            {/* 조건 충족 시 '팟 만들기' 버튼 표시 (원의 우측 하단 바깥) */}
            {isFormValid() && (
              <TextLink as="button" onClick={handleSubmit}>
                {/* 팟만들기-2페이지로 연결 */}
                팟 만들기
                <img src={ArrowBtn} alt="화살표" />
              </TextLink>
            )}
          </Content>
        </Container>
      </Page>
    </>
  );
}
