import { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';

import { getHomeData, getPodGoal } from '../api/Home';
import { getMyProfile } from '../api/user';

import StudyType from '../components/common/tagChip/StudyType';
import StudyMood from '../components/common/tagChip/StudyMood';

import Phill from '../components/common/tagChip/Pill';
import Button from '../components/common/Button';
import ArrowBtn from '../assets/svg/ArrowBtn.svg';
import Location_S from '../assets/svg/Location_S.svg';
import Profile_S from '../assets/svg/Profile_S.svg';

// css
import {
  Page,
  StatusBar,
  Container,
  TopGrid,
  TodayCard,
  CardTitle,
  CardDetail,
  Tag,
  CheckBtn,
  RightCard,
  SubCard,
  SubText,
  TextLink,
  Section,
  SectionTitle,
  Grid,
  PodCard,
  PodImg,
  PodBody,
  PodName,
  PodDetail,
  PodSvg,
  LoaderContainer,
} from '../styles/Home.style';

// func.
export default function Home() {
  // 임시 데이터
  const retrospect = {
    name: '모각코',
  };

  // API 연결
  const [today, setToday] = useState(null);
  const [pods, setPods] = useState([]);
  const [podGoal, setPodGoal] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [{ today: todayData, group: groupData }, myProfile] =
          await Promise.all([getHomeData(), getMyProfile()]);

        console.log('새로고침 데이터 확인:', { todayData, myProfile }); // test
        console.log('추천팟 데이터 확인:', { groupData }); // test

        setToday(todayData);
        setPods(groupData);
        setProfile(myProfile);

        if (todayData) {
          // 오늘의 팟이 존재하면 -> podId로 목표 조회
          const goal = await getPodGoal(todayData.podId, myProfile.id);
          setPodGoal(goal);
        } else {
          // 오늘의 팟이 없으면 -> 목표도 없음(null) 처리
          setPodGoal(null);
        }
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

  // 로딩 화면
  if (!profile) {
    return (
      <LoaderContainer>
        <BounceLoader color="#D9695C" loading={true} size={60} />
      </LoaderContainer>
    );
  }

  return (
    <>
      <Page>
        <StatusBar>
          {today ? (
            <span>
              {profile.targetMessage}
              {getParticle(profile.targetMessage, 'object')} 위해 {randomText}
            </span>
          ) : (
            <span>{randomEmoji}</span>
          )}
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
                    {today.place !== '미정' && (
                      <>
                        <Phill
                          shape="chip"
                          variant="outlined"
                          size="large"
                          style={{ marginLeft: '8px', marginRight: '3px' }}
                        >
                          {today.place}
                        </Phill>
                        에서{' '}
                      </>
                    )}
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
                      {podGoal ? podGoal : '어떤 목표를 이루어볼까요?'}
                    </Phill>
                    {/* {podGoal ? (
                      <Phill
                      shape="chip"
                      variant="filled"
                      backgroundColor="#d9695c"
                      size="small"
                      >
                        {podGoal}
                      </Phill>
                    ):(
                      <Phill
                        shape="chip"
                        variant="outlined"
                        size="small"
                      >
                        {"어떤 목표를 이루어볼까요?"}
                      </Phill>
                    )} */}
                  </Tag>
                  <CheckBtn to={`/pod/${today.podId}`}>
                    <Button
                      shape="chip"
                      variant="white"
                      size="small"
                      style={{ fontSize: '20px', width: 118, height: 39 }}
                      data-target="#recommendPotList"
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
                <PodCard key={pod.id} to={`/pod/${pod.id}`}>
                  <PodImg src={`/images/${pod.podImg}`} alt="팟 이미지" />
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
