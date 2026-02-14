import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

// === 전체 큰 틀 ===

// 1920*1024 비율 맞춰서 반응형 수정 필요
export const Page = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  padding: 0px;

  box-sizing: border-box;
`;

export const StatusBar = styled.div`
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

export const Container = styled.div`
  margin: 0;
`;

// === 상단부 ===
export const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 28px;
  justify-content: space-between; /* 가로축 */
  align-items: center; /* 세로축 */
  padding: 0 200px;

  margin: 48px 0;
`;

export const Card = styled.section`
  background: #fff;
  border-radius: 30px;

  display: flex;
  flex-direction: column;
`;

export const TodayCard = styled(Card)`
  height: calc(100% - 48px);
  padding: 28px 32px;
  position: relative;
  box-shadow: 0 0 7px rgba(0, 7, 0, 0.25);
`;

export const CardTitle = styled.h2`
  color: #000;
  font-size: 28px;
  font-weight: 700;
  margin: 20px 0;
`;

export const CardDetail = styled.p`
  display: flex;
  color: #000;
  font-size: 24px;
  font-weight: 500;
  line-height: 50px;
  margin-bottom: 40px;

  align-items: center;
`;

export const Tag = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const CheckBtn = styled(Link)`
  align-items: center;
  justify-content: space-between;
  display: inline-flex;

  margin-top: auto;
  align-self: flex-end;

  text-decoration: none;
`;

// 우측 카드
export const RightCard = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 18px;
  height: 100%;
`;

export const SubCard = styled(Card)`
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

export const SubText = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #000;
  }
`;

export const TextLink = styled(Link)`
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
export const Section = styled.section`
  width: 100%;
  height: auto;
  padding: 50px 200px;

  background: #fbf2f1;

  box-sizing: border-box;
`;

export const SectionTitle = styled.h3`
  color: #000;
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
`;

export const PodCard = styled(Link)`
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

export const PodImg = styled.img`
  margin: 33px 0 0 0;
  width: 100%;
  height: 47%;
  object-fit: cover;
`;

export const PodBody = styled.div`
  padding: 12px 16px 20px 16px;
`;

export const PodName = styled.p`
  margin: 8px 0 10px;
  font-size: 20px;
  font-weight: 400;
  color: #000;
`;

export const PodDetail = styled.div`
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

export const PodSvg = styled.img`
  width: 24px;
  height: 24px;

  display: inline-block;
`;
