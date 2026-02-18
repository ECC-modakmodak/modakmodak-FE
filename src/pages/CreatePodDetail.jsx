// import
import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { postSetupPod2 } from '../api/CreatePod';

import ArrowBtn from '../assets/svg/ArrowBtn.svg';

// css
import {
  Page,
  Grid,
  TitleWrapper,
  Title,
  Left,
  Right,
  Row,
  InputTitle,
  InputWrapper,
  Input_SS,
  Input_S,
  Input_M,
  Input_L,
  SaveBtn,
  PodCard,
  PodImg,
  ImgLink,
  RandomImgBtn,
  CreateBtn,
} from '../styles/CreatePodDetail.style';

export default function CreatePodDetail() {
  // === status ===
  const [inputs, setInputs] = useState({
    name: '',
    dateTime: '', // UI 입력용 (오류 방지)
    date: '', // 저장 데이터 (분리)
    time: '', // 저장 데이터 (분리)
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

  const { meetingId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const type = location.state?.type;
  const isZoom = type === 'ZOOM'; // ZOOM 여부 확인용 변수

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
  const POD_IMAGES = ['pod_1', 'pod_2', 'pod_3', 'pod_4'];

  const getRandomPodImage = () => {
    const index = Math.floor(Math.random() * POD_IMAGES.length);
    return POD_IMAGES[index];
  };

  const [podImg, setPodImg] = useState(getRandomPodImage);

  const handleRandomImage = () => {
    setPodImg((prev) => {
      let next;
      do {
        next = POD_IMAGES[Math.floor(Math.random() * POD_IMAGES.length)];
      } while (next === prev);
      return next;
    });
  };

  // ISO 형식 변환
  const buildIsoDateTime = (md, time) => {
    // md: "1/23", time: "23:00"
    const [m, d] = md.split('/').map(Number);
    const [hh, mm] = time.split(':').map(Number);
    const year = new Date().getFullYear();
    const dt = new Date(year, m - 1, d, hh, mm);
    // "2026-02-20T19:00" 형태로 만들기
    return dt.toISOString().slice(0, 16);
  };

  // 값 저장 확인
  const isFormValid = () => {
    // ZOOM이면 OK, 아니면 저장버튼 눌렀는지 확인
    const isPlaceReady = isZoom ? true : status.isPlaceSaved;

    return (
      status.isNameSaved &&
      status.isTimeSaved &&
      isPlaceReady &&
      status.isDetailSaved &&
      podImg !== null
    );
  };

  const handleSubmitDetail = async () => {
    if (!meetingId) {
      console.error('meetingId가 없음');
      return;
    }
    if (!isFormValid()) return;

    const dateTimeIso = buildIsoDateTime(inputs.date, inputs.time);
    try {
      await postSetupPod2({
        meetingId,
        name: inputs.name,
        date: dateTimeIso,
        // ZOOM이면 장소 정보(area)를 null로 보냄
        placeGeneral: isZoom ? null : inputs.placeGeneral,
        placeDetail: inputs.placeDetail,
        detail: inputs.detail,
        imageUrl: `${podImg}.png`,
      });
      // 성공 후 상세페이지로
      navigate(`/pod/${meetingId}`);
    } catch (error) {
      console.error('팟 만들기(step2) 실패', error);
    }
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
                  name="dateTime"
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
                {!isZoom && (
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
                )}
                <Input_S
                  name="placeDetail"
                  placeholder={
                    isZoom ? '줌 링크 또는 접속 방법' : '예) 스타벅스 홍대역점'
                  }
                  value={inputs.placeDetail}
                  onChange={handleChange}
                  readOnly={status.isPlaceSaved}
                  onClick={() =>
                    status.isPlaceSaved && handleEdit('isPlaceSaved')
                  }
                />
                {!isZoom && !status.isPlaceSaved && (
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
                <PodImg src={`/images/${podImg}.png`} alt="팟 이미지" />
              </PodCard>

              {/* 누르면 '랜덤 이미지' = 이미지 4개 중 랜덤 1 택 해서 PodImg cover */}
              {/* [ 파일 업로드 기능은 삭제됨] */}
              <ImgLink>
                <RandomImgBtn onClick={handleRandomImage}>
                  랜덤 이미지
                </RandomImgBtn>
              </ImgLink>
            </Row>

            {/* 모든 SaveBtn 눌려있고 이미지 적용되어 있을 때 생김 */}
            {isFormValid() && (
              <CreateBtn onClick={handleSubmitDetail}>
                {/* 팟 상세 페이지로 연결 */}
                팟 만들기
                <img src={ArrowBtn} alt="화살표" />
              </CreateBtn>
            )}
          </Right>
        </Grid>
      </Page>
    </>
  );
}
