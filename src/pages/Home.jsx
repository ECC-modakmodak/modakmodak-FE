import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import StudyType from '../components/common/tagChip/StudyType';
import StudyMood from '../components/common/tagChip/StudyMood';

import Phill from '../components/common/tagChip/Pill';
import Button from '../components/common/Button';
import Arrow_R from '../assets/svg/Arrow_R.svg';
import Location_S from '../assets/svg/Location_S.svg';
import Profile_S from '../assets/svg/Profile_S.svg';

// (임시) 팟 대표 이미지
import podImg1 from '../assets/images/podImg1.JPG';

// === 전체 큰 틀 ===

// 1920*1024 비율 맞춰서 반응형 수정 필요
const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background: #fff;
  padding: 0px;

  box-sizing: border-box;
`;

const StatusBar = styled.div`
  width: 100%;
  height: 90px;
  background: #d9695c;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 28px;
  font-weight: 700;
  color: #fff;
`;

const Container = styled.div`
  margin: 0;
`;

// === 상단부 ===
const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 28px;
  justify-content: space-between; /* 가로축 */
  align-items: center; /* 세로축 */
  padding: 0 200px;

  margin: 48px 0;
`;

const Card = styled.section`
  background: #fff;
  border-radius: 30px;

  display: flex;
  flex-direction: column;
`;

const TodayCard = styled(Card)`
  height: calc(100% - 48px);
  padding: 28px 32px;
  position: relative;
  box-shadow: 0 0 7px rgba(0, 7, 0, 0.25);
`;

const CardTitle = styled.h2`
  color: #000;
  font-size: 28px;
  font-weight: 700;
  margin: 20px 0;
`;

const CardDetail = styled.p`
  display: flex;
  color: #000;
  font-size: 24px;
  font-weight: 500;
  line-height: 50px;
  margin-bottom: 40px;

  align-items: center;
`;

const Tag = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CheckBtn = styled(Link)`
  align-items: center;
  justify-content: space-between;
  display: inline-flex;

  margin-top: auto;
  align-self: flex-end;

  text-decoration: none;
`;

// 우측 카드
const RightCard = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 18px;
  height: 100%;
`;

const SubCard = styled(Card)`
  padding: 34px 15px 21px 45px;
  display: flex;
  justify-content: space-between;

  border: 1px solid #d9d9d9;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;

  :hover {
    box-shadow: 0 0 7px 0 rgba(217, 105, 92, 1);
  }
`;

const SubText = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #000;
  }
`;

const TextLink = styled(Link)`
  display: inline-flex;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  text-decoration: none;

  margin-top: auto;
  align-self: flex-end;
  align-items: center;
  gap: 5px;
`;

// === 추천 팟 영역 ===
const Section = styled.section`
  width: 100%;
  height: auto;
  padding: 50px 200px;

  background: #fbf2f1;

  box-sizing: border-box;
`;

const SectionTitle = styled.h3`
  color: #000;
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
`;

const PodCard = styled(Link)`
  height: 300px;
  background: #fff;
  border-radius: 30px;
  position: relative;

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
`;

const PodBody = styled.div`
  padding: 12px 16px 20px 16px;
`;

const PodName = styled.p`
  margin: 8px 0 10px;
  font-size: 20px;
  font-weight: 400;
  color: #000;
`;

const PodDetail = styled.div`
  display: flex;
  gap: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  align-items: center;
  span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
`;

const PodSvg = styled.img`
  width: 24px;
  height: 24px;

  display: inline-block;
`;

// func.
export default function Home() {
  // === (임시) 덤 데이터 3set ===

  /* null test data 
  const retrospect = null;
  const today = null;
  */
  const retrospect = {
    name: '모각코_회고',
  };
  const today = {
    time: '21:00',
    place: '이화여대',
    name: '모각코',
    mood: 'chatty', // chatty / quiet
    type: 'cafe', // cafe / zoom / other
    goal: '소플의 리액트 7장 공부하기',
  };

  // [TODO]  - 팟 생성 일자 최신순으로 12개 정렬
  const recommendPods = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    mood: i % 2 === 0 ? 'chatty' : 'quiet',
    type: i % 3 === 0 ? 'cafe' : i % 3 === 1 ? 'zoom' : 'other',
    title: i % 2 === 0 ? '모각코 할 사람~!' : '토익 같이 공부해요',
    location: i % 2 === 0 ? '신촌' : null,
    people: i % 2 === 0 ? '2/5' : '1/5', // 데이터 받을 땐 최대 인원, 참여 인원 나눠야 함.
    //image:
  }));

  const DisabledLink = (e) => {
    e.preventDefault(); // Link 이동 막기
    alert('준비 중인 페이지입니다.'); // 알림창 표시
  };

  // 모임 시간 아닐 때
  const RandomEmoji = ['😴💤💤', '😵‍💫✨✨', '🤔💦💦'];
  // 이 3개 중 랜덤
  const [randomEmoji] = useState(
    () => RandomEmoji[Math.floor(Math.random() * RandomEmoji.length)],
  );
  // 모임 시간 중일 때
  const RandomText = [
    '불태우는 중 🔥🔥',
    '오늘도 한 걸음 👣👣',
    '꾸준히 달려요 🏃🏻🏃🏻',
    '집중하고 있어요 🧐🧐',
  ];
  // 이 4개 중 랜덤
  const [randomText] = useState(
    () => RandomText[Math.floor(Math.random() * RandomText.length)],
  );

  return (
    <>
      <Page>
        {/* === 최상단 상태 표시줄 === */}
        {/* [TODO] - 현재 시간 / 예정된 팟 시간 비교  */}
        <StatusBar>
          {/* 현재 진행 중인 팟 x */}
          <span>{randomEmoji}</span>
          {/* 현재 진행 중인 팟 o */}
          {/*
          <span>{today.goal}를 위해 {randomText}</span>
          [TODO] goal 마지막 글자 따라서 -> 을/를 구분
          */}
        </StatusBar>

        {/* === 메인 컨텐츠 === */}
        <Container>
          {/* === 상단 그리드 영역 === */}
          <TopGrid>
            {/* === 2:1 좌측 === */}
            <TodayCard>
              <CardTitle>오늘의 팟</CardTitle>
              {today ? (
                /* 오늘 예정된 팟 o */
                <>
                  <CardDetail>
                    오늘{' '}
                    <Phill
                      shape="chip"
                      variant="outlined"
                      size="large"
                      style={{ marginLeft: '8px', marginRight: '3px' }}
                    >
                      {today.time}
                    </Phill>
                    ,{' '}
                    <Phill
                      shape="chip"
                      variant="outlined"
                      size="large"
                      style={{ marginLeft: '8px', marginRight: '3px' }}
                    >
                      {today.place}
                    </Phill>
                    에서{' '}
                    <Phill
                      shape="chip"
                      variant="outlined"
                      size="large"
                      style={{ marginLeft: '8px', marginRight: '3px' }}
                    >
                      {today.name}
                    </Phill>
                    가 예정되어 있어요.
                    {/* [TODO] name 마지막 글자 따라서 -> 이/가 수정 필요 */}
                  </CardDetail>
                  <Tag>
                    <StudyMood type={today.mood} />
                    <StudyType type={today.type} />
                  </Tag>
                  <Tag>
                    <Phill
                      shape="chip"
                      variant="filled"
                      backgroundColor="#d9695c"
                      size="small"
                    >
                      {today.goal}
                    </Phill>
                  </Tag>
                  <CheckBtn to="/">
                    {' '}
                    {/* (임시) 예정된 팟 상세 페이지로 이동 */}
                    <Button
                      shape="chip"
                      variant="white"
                      size="small"
                      style={{ fontSize: '20px', width: 118, height: 39 }}
                    >
                      확인하기
                    </Button>
                  </CheckBtn>
                </>
              ) : (
                <CardDetail>오늘 예정된 팟이 없어요.</CardDetail>
              )}
            </TodayCard>

            {/* === 2:1 우측 === */}
            <RightCard>
              <SubCard>
                {/* 우측 상단 */}
                <SubText>
                  <p>원하는 팟을</p>
                  <p>직접 만들어 보세요!</p>
                </SubText>
                <TextLink to="/CreatePod">
                  팟 만들러 가기
                  <img src={Arrow_R} alt="화살표" />
                </TextLink>
              </SubCard>
              <SubCard>
                {/* 우측 하단 */}
                {retrospect ? (
                  /* 회고할 팟 o */
                  <>
                    <SubText>
                      <p>
                        지난{' '}
                        <span style={{ color: '#d9695c' }}>
                          {retrospect.name}
                        </span>
                        의 회고를
                      </p>
                      <p>남겨 주세요!</p>
                    </SubText>
                    <TextLink to="/" onClick={DisabledLink}>
                      회고하러 가기
                      <img src={Arrow_R} alt="화살표" />
                    </TextLink>
                  </>
                ) : (
                  /* 회고할 팟 x  */
                  <>
                    <SubText>
                      <p>나의 회고를</p>
                      <p>돌아볼까요?</p>
                    </SubText>
                    <TextLink to="/" onClick={DisabledLink}>
                      회고보러 가기
                      <img src={Arrow_R} alt="화살표" />
                    </TextLink>
                  </>
                )}
              </SubCard>
            </RightCard>
          </TopGrid>

          {/* === 추천 팟 영역 === */}
          <Section>
            <SectionTitle>함꼐할 팟 찾기</SectionTitle>
            {/* 추천 팟 목록 grid 3*4 12개 */}
            <Grid>
              {recommendPods.map((p) => (
                <PodCard key={p.id} to={`/p/${p.id}`}>
                  {/* (임시) 팟 상세 페이지로 이동 */}
                  <PodImg src={podImg1} alt="팟 이미지" />
                  <PodBody>
                    <Tag>
                      <StudyMood type={p.mood} />
                      <StudyType type={p.type} />
                    </Tag>

                    <PodName>{p.title}</PodName>

                    <PodDetail>
                      {p.location ? (
                        /* 위치 정보 o */
                        <span>
                          <PodSvg src={Location_S} alt="위치" />
                          {p.location}
                        </span>
                      ) : /* 위치 정보 x */
                      null}
                      <span>
                        <PodSvg src={Profile_S} alt="참여인원" />
                        {p.people}
                      </span>
                    </PodDetail>
                  </PodBody>
                </PodCard>
              ))}
            </Grid>
          </Section>
        </Container>
      </Page>
    </>
  );
}
