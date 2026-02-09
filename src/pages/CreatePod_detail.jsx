// import
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

import Input from '../components/common/Input';
import Button from '../components/common/Button';
import ArrowBtn from '../assets/svg/ArrowBtn.svg';
// 팟 대표 이미지 4종
import PodImg0 from '../assets/svg/PodImg0.SVG';
import PodImg1 from '../assets/svg/PodImg1.SVG';
import PodImg2 from '../assets/svg/PodImg2.SVG';
import PodImg3 from '../assets/svg/PodImg3.SVG';

{
  /* grid 2:1 */
}
// css
const Page = styled.div`
  width: 100%;
  height: 100%;
  padding: 71px 200px 60px 200px;
  background: #fff;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 34px 92px;

  width: fit-content;
  margin: 0 auto;
  align-items: start;
`;

const TitleWrapper = styled.div`
  grid-column: 1 / -1;
`;

const Title = styled.h1`
  color: #000;
  font-size: 28px;
  font-weight: 700;
  text-align: left;

  margin: 0;
`;

const Left = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  gap: 25px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputTitle = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 500;

  marign-top: 10px;
`;

const InputWrapper = styled.div`
  display: inline-flex;
  gap: 10px;
`;

const BaseInput = styled(Input)`
  padding: 13px 20px;
  font-size: 20px;
  font-weight: 500;

  border: 1px solid #000;
`;

const Input_SS = styled(BaseInput)`
  display: inline-flex;
  width: 193px;
  height: 50px;

  padding: 13px 20px;

  font-size: 20px;
  font-weight: 500;
`;

const Input_S = styled(BaseInput)`
  display: inline-flex;
  width: 293px;
  height: 50px;
  padding: 13px 20px;

  font-size: 20px;
  font-weight: 500;
`;

const Input_M = styled(BaseInput)`
  display: inline-flex;
  width: 500px;
  height: 50px;
  padding: 13px 20px;

  font-size: 20px;
  font-weight: 500;
`;

const Input_L = styled(BaseInput)`
  width: 500px;
  height: 140px;
  padding: 13px 20px;

  font-size: 20px;
  font-weight: 500;

  text-align: left;
  resize: none;
`;

const SaveBtn = styled(Button)`
  display: inline-flex;
  height: 50px;
  padding: 12px 30px;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 500;
`;

const PodCard = styled.div`
  width: 300px;
  height: 275px;
  background: #fff;
  border-radius: 30px;
  position: relative;
  box-shadow: 0 0 10px 0 rgba(0, 2, 0, 0.15);
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 4px solid #d9695c;
    pointer-events: none;

    -webkit-mask: linear-gradient(#000 0 0) top / 100% 22px no-repeat;
    mask: linear-gradient(#000 0 0) top / 100% 33px no-repeat;
  }
`;

const PodImg = styled.img`
  margin: 33px 0 0 0;
  width: 100%;
  height: 47%;
  object-fit: cover;
  display: block;
`;
const ImgLink = styled.div`
  margin-top: 27px;
  display: flex;
  gap: 11px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextLink_S = styled(Link)`
  text-decoration: underline;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;

const TextLink = styled(Link)`
  display: inline-flex;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  margin-top: auto;

  text-decoration: none;
  gap: 5px;

  color: #000;
  font-size: 20px;
  font-weight: 500;

  cursor: pointer;
`;

export default function CreatePod_detail() {
  // === status ===
  const [inputs, setInputs] = useState({
    name: '',
    dateTime: '', // UI 입력용 (오류 방지)
    date: '', // 최종 저장 데이터 (분리)
    time: '', // 최종 저장 데이터 (분리)
    placeGeneral: '',
    placeDetail: '',
    detail: '',
  });

  const [status, setStatus] = useState({
    isNameSaved: false,
    isTimeSaved: false,
    isPlaceSaved: false,
    isDetailSaved: false,
  });

  // === 핸들러 ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateTimeChange = (e) => {
    const value = e.target.value;

    setInputs((prev) => ({
      ...prev,
      dateTime: value,
    }));
  };

  const isValidDateTimeFormat = (date, time) => {
    return /^\d{1,2}\/\d{1,2}$/.test(date) && /^\d{2}:\d{2}$/.test(time);
  };

  const handleSave = (key) => {
    // name
    if (key === 'isNameSaved' && !inputs.name)
      return alert('이름을 입력해주세요.');
    // time
    if (key === 'isTimeSaved') {
      // 1. 공백을 기준으로 날짜와 시간 분리
      const parts = inputs.dateTime.trim().split(' ');
      if (parts.length !== 2) {
        return alert(
          '날짜와 시간을 띄어쓰기로 구분해 입력해주세요. (예: 1/23 23:00)',
        );
      }

      const [date, time] = parts;

      // 2. 형식 검사
      if (!isValidDateTimeFormat(date, time)) {
        return alert('형식이 올바르지 않습니다. (예: 1/23 23:00)');
      }

      // 3. 검사 통과 시 date와 time을 각각 저장
      setInputs((prev) => ({ ...prev, date: date, time: time }));
    }

    // place
    if (key === 'isPlaceSaved' && (!inputs.placeGeneral || !inputs.placeDetail))
      return alert('장소를 모두 입력해주세요.');

    //detail
    if (key === 'isDetailSaved' && !inputs.detail)
      return alert('소개를 입력해주세요.');

    setStatus((prev) => ({ ...prev, [key]: true }));
  };

  const handleEdit = (key) => {
    setStatus((prev) => ({ ...prev, [key]: false }));
  };

  // 팟 이미지 관리
  const POD_IMAGES = [PodImg0, PodImg1, PodImg2, PodImg3];

  const getRandomPodImage = () => {
    const index = Math.floor(Math.random() * POD_IMAGES.length);
    return POD_IMAGES[index];
  };

  const [podImg, setPodImg] = useState(getRandomPodImage);
  const fileInputRef = useRef(null);

  const handleRandomImage = () => {
    setPodImg((prev) => {
      let next;
      do {
        next = POD_IMAGES[Math.floor(Math.random() * POD_IMAGES.length)];
      } while (next === prev);
      return next;
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPodImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 값 저장 확인
  const isFormValid = () => {
    return (
      status.isNameSaved &&
      status.isTimeSaved &&
      status.isPlaceSaved &&
      status.isDetailSaved &&
      podImg !== null
    );
  };

  return (
    <>
      <Page>
        <Grid>
          <TitleWrapper>
            <Title>🤔 어떤 팟을 만들까?</Title>
          </TitleWrapper>
          <Left>
            <Row>
              <InputTitle>팟 이름</InputTitle>
              <InputWrapper>
                <Input_M
                  name="name"
                  placeholder="시선을 사로잡는 이름을 지어주세요!"
                  value={inputs.name}
                  onChange={handleChange}
                  readOnly={status.isNameSaved}
                  onClick={() =>
                    status.isNameSaved && handleEdit('isNameSaved')
                  }
                />
                {!status.isNameSaved && (
                  <SaveBtn
                    variant="secondary"
                    onClick={() => handleSave('isNameSaved')}
                  >
                    확인
                  </SaveBtn>
                )}
              </InputWrapper>
            </Row>
            <Row>
              {/* 값 받을 때, 날짜 시간 -> 띄어쓰기로 분류 */}
              <InputTitle>팟 날짜 & 시간</InputTitle>
              <InputWrapper>
                <Input_M
                  name="datetime"
                  placeholder="예) 1/23 23:00 (띄어쓰기로 구분)"
                  value={inputs.dateTime}
                  onChange={handleDateTimeChange}
                  readOnly={status.isTimeSaved}
                  onClick={() =>
                    status.isTimeSaved && handleEdit('isTimeSaved')
                  }
                />
                {!status.isTimeSaved && (
                  <SaveBtn
                    variant="secondary"
                    onClick={() => handleSave('isTimeSaved')}
                  >
                    확인
                  </SaveBtn>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputTitle>팟 장소</InputTitle>
              <InputWrapper>
                <Input_SS
                  name="placeGeneral"
                  placeholder="예) 신촌, 홍대"
                  value={inputs.placeGeneral}
                  onChange={handleChange}
                  readOnly={status.isPlaceSaved}
                  onClick={() =>
                    status.isPlaceSaved && handleEdit('isPlaceSaved')
                  }
                />
                <Input_S
                  name="placeDetail"
                  placeholder="예) 스타벅스 홍대역점"
                  value={inputs.placeDetail}
                  onChange={handleChange}
                  readOnly={status.isPlaceSaved}
                  onClick={() =>
                    status.isPlaceSaved && handleEdit('isPlaceSaved')
                  }
                />
                {!status.isPlaceSaved && (
                  <SaveBtn
                    variant="secondary"
                    onClick={() => handleSave('isPlaceSaved')}
                  >
                    확인
                  </SaveBtn>
                )}
              </InputWrapper>
            </Row>
            <Row>
              <InputTitle>팟 소개</InputTitle>
              <InputWrapper>
                <Input_L
                  name="detail"
                  placeholder="간단한 소개를 작성해주세요"
                  value={inputs.detail}
                  onChange={handleChange}
                  readOnly={status.isDetailSaved}
                  onClick={() =>
                    status.isDetailSaved && handleEdit('isDetailSaved')
                  }
                  as="textarea" // 여러 줄 가능하게
                />
                {!status.isDetailSaved && (
                  <SaveBtn
                    style={{ alignSelf: 'flex-end' }}
                    variant="secondary"
                    onClick={() => handleSave('isDetailSaved')}
                  >
                    확인
                  </SaveBtn>
                )}
              </InputWrapper>
            </Row>
          </Left>
          <Right>
            <Row>
              <InputTitle>팟 이미지</InputTitle>
              <PodCard>
                <PodImg src={podImg} alt="팟 이미지" />
              </PodCard>

              {/* 누르면 '랜덤 이미지' = 이미지 4개 중 랜덤 1 택 해서 PodImg cover */}
              {/* 누르면 '이미지 가져오기' = 사용자 로컬 라이브러리에서 선택 가능 */}
              <ImgLink>
                <TextLink_S onClick={handleRandomImage}>랜덤 이미지</TextLink_S>
                <TextLink_S onClick={handleUploadClick}>
                  이미지 가져오기
                </TextLink_S>
              </ImgLink>

              {/* 실제 파일 입력 버튼은 숨김 처리 */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </Row>

            {/* 모든 SaveBtn 눌려있고 이미지 적용되어 있을 때 생김 */}
            {isFormValid() && (
              <TextLink to="/pod/:podId">
                {' '}
                {/* 같은 데이터로 팟 상세페이지 연결 */}
                팟 만들기
                <img src={ArrowBtn} alt="화살표" />
              </TextLink>
            )}
          </Right>
        </Grid>
      </Page>
    </>
  );
}
