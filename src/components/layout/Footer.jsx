import styled from '@emotion/styled';

/* 푸터 전체*/
const FooterWrap = styled.footer`
  box-sizing: border-box;

  display: flex;
  width: 100%;
  height: 110px;
  background-color: #EFEFEF;
  padding: 20px;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
  ffont-size: clamp(12px, 2.5vw, 20px);
  font-weight: 400;
  color: #A5A5A5;

  p {
    margin: 7px;
    }
`;

export default function Footer() {
  return (
    <FooterWrap>
      <p>개인정보보호정책 | 이용약관</p>
      <p>© mdmd. All rights reserved.</p>
    </FooterWrap>
  )
}