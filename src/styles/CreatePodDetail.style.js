import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export const Page = styled.div`
  width: 100%;
  height: 100%;
  padding: 71px 200px 60px 200px;
  background: #fff;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 34px 92px;

  width: fit-content;
  margin: 0 auto;
  align-items: start;
`;

export const TitleWrapper = styled.div`
  grid-column: 1 / -1;
`;

export const Title = styled.h1`
  color: #000;
  font-size: 28px;
  font-weight: 700;
  text-align: left;

  margin: 0;
`;

export const Left = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  gap: 25px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputTitle = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 500;

  marign-top: 10px;
`;

export const InputWrapper = styled.div`
  display: inline-flex;
  gap: 10px;
`;

export const BaseInput = styled(Input)`
  padding: 13px 20px;
  font-size: 20px;
  font-weight: 500;

  border: 1px solid #000;
`;

export const Input_SS = styled(BaseInput)`
  display: inline-flex;
  width: 193px;
  height: 50px;

  padding: 13px 20px;

  font-size: 20px;
  font-weight: 500;
`;

export const Input_S = styled(BaseInput)`
  display: inline-flex;
  width: 293px;
  height: 50px;
  padding: 13px 20px;

  font-size: 20px;
  font-weight: 500;
`;

export const Input_M = styled(BaseInput)`
  display: inline-flex;
  width: 500px;
  height: 50px;
  padding: 13px 20px;

  font-size: 20px;
  font-weight: 500;
`;

export const Input_L = styled(BaseInput)`
  width: 500px;
  height: 140px;
  padding: 13px 20px;

  font-size: 20px;
  font-weight: 500;

  text-align: left;
  resize: none;
`;

export const SaveBtn = styled(Button)`
  display: inline-flex;
  height: 50px;
  padding: 12px 30px;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 500;
`;

export const PodCard = styled.div`
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

export const PodImg = styled.img`
  margin: 33px 0 0 0;
  width: 100%;
  height: 47%;
  object-fit: cover;
  display: block;
`;
export const ImgLink = styled.div`
  margin-top: 27px;
  display: flex;
  gap: 11px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TextLink_S = styled(Link)`
  text-decoration: underline;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;

export const TextLink = styled(Link)`
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
