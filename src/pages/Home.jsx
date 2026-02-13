import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getTodayPod, getGroupPods } from '../api/pod';

import StudyType from '../components/common/tagChip/StudyType';
import StudyMood from '../components/common/tagChip/StudyMood';

import Phill from '../components/common/tagChip/Pill';
import Button from '../components/common/Button';
import ArrowBtn from '../assets/svg/ArrowBtn.svg';
import Location_S from '../assets/svg/Location_S.svg';
import Profile_S from '../assets/svg/Profile_S.svg';

// (임시) 기본 팟 이미지
import exImgPod from '../assets/svg/exPodImg.svg';

// ===== [TODO] =====
// 이미지 연결 링크 확인
// 상태바 -> 개인 목표 연결
// 상태바 -> 현재 - 팟 시간 비교 -> meetingNow ? 조건문
// todayPod) id 받아서 확인하기 연결
// todayPod) podGoal 받아서 연결
// totalGroupData) location 연결

// func.
export default function Home() {
  // 임시 데이터
  const retrospect = {
    name: '모각코_회고',
  };

  // API 연결
  const [today, setToday] = useState(null);
  const [pods, setPods] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const todayData = await getTodayPod();
        const groupData = await getGroupPods();

        console.log('groupData:', groupData);

        setToday(todayData);
        setPods(groupData);
      } catch (err) {
        console.error('홈 데이터 불러오기 실패', err);
      }
    };

    loadHomeData();
  }, []);

  const DisabledLink = (e) => {
    e.preventDefault(); // Link 이동 막기
    alert('준비 중인 페이지입니다.'); // 알림창 표시
  };

  // 모임 시간 아닐 때
  const RandomEmoji = ['😴💤💤', '😵‍💫✨✨', '🤔💦💦'];
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
  const [randomText] = useState(
    () => RandomText[Math.floor(Math.random() * RandomText.length)],
  );

  // 을/를 이/가 구분
  const getParticle = (word, type) => {
    if (!word) return '';

    const lastChar = word[word.length - 1];
    const code = lastChar.charCodeAt(0);

    if (code < 0xac00 || code > 0xd7a3) {
      return type === 'subject' ? '가' : '를';
    }

    const hasBatchim = (code - 0xac00) % 28 !== 0;

    if (type === 'subject') {
      return hasBatchim ? '이' : '가';
    }

    if (type === 'object') {
      return hasBatchim ? '을' : '를';
    }

    return '';
  };
  return (
    <>
      <Page>
        {/* [TODO] - 현재 시간 / 예정된 팟 시간 비교  */}
        <StatusBar>
          <span>{randomEmoji}</span>
          {/*
          {meetingNow ? (
            <span>{today.goal}{getParticle(today.goal)} 위해 {randomText}</span>
          ) : (
            <span>{randomEmoji}</span>
          )} */}
        </StatusBar>

        {/* === 메인 컨텐츠 === */}
        <Container>
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
                    {getParticle(today.name, 'subject')} 예정되어 있어요.
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
                    {/* [TODO] 팟 상세 페이지로 이동 <- id 필드 생기면 */}
                    <Button
                      shape="chip"
                      variant="white"
                      size="small"
                      style={{ fontSize: '20px', width: 118, height: 39 }}
                      data-target="#recommendPotList"
                      // onclik='/pod/:${podId}' [TODO]
                    >
                      확인하기
                    </Button>
                  </CheckBtn>
                </>
              ) : (
                <>
                  <CardDetail>오늘 예정된 팟이 없어요.</CardDetail>
                  <CheckBtn
                    to="/"
                    onClick={(e) => {
                      e.preventDefault();
                      const target =
                        document.querySelector('#recommendPotList');
                      if (!target) return;

                      window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth',
                      });
                    }}
                  >
                    <Button
                      shape="chip"
                      variant="white"
                      size="small"
                      style={{ fontSize: '20px', width: 161, height: 39 }}
                    >
                      팟 찾으러 가기
                    </Button>
                  </CheckBtn>
                </>
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
                <TextLink to="/create">
                  팟 만들러 가기
                  <img src={ArrowBtn} alt="화살표" />
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
                      <img src={ArrowBtn} alt="화살표" />
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
                      <img src={ArrowBtn} alt="화살표" />
                    </TextLink>
                  </>
                )}
              </SubCard>
            </RightCard>
          </TopGrid>

          {/* === 추천 팟 영역 === */}
          <Section id="recommendPotList">
            <SectionTitle>함께할 팟 찾기</SectionTitle>
            {/* 추천 팟 목록 grid 3*4 12개 */}
            <Grid>
              {pods.map((pod) => (
                <PodCard key={pod.id} to={`/pod/:${pod.id}`}>
                  {/* [TODO] 팟 이미지 연결 */}
                  <PodImg src={pod.podImg || exImgPod} alt="팟 이미지" />
                  <PodBody>
                    <Tag>
                      <StudyMood type={pod.mood} />
                      <StudyType type={pod.type} />
                    </Tag>

                    <PodName>{pod.title}</PodName>

                    <PodDetail>
                      {pod.location ? (
                        /* 위치 정보 o */
                        <span>
                          <PodSvg src={Location_S} alt="위치" />
                          {pod.location}
                        </span>
                      ) : /* 위치 정보 x */
                      null}
                      <span>
                        <PodSvg src={Profile_S} alt="참여인원" />
                        {pod.people}
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

// === 전체 큰 틀 ===

// 1920*1024 비율 맞춰서 반응형 수정 필요
const Page = styled.div`
  width: 100%;
  height: 100%;
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
