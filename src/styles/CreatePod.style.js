import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';

export const Page = styled.div`
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  margin-bottom: 41px;

  color: #000;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

export const Content = styled.div`
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
export const Row = styled.div`
  display: flex;
  position: relative;
  gap: 23px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
export const OptionText = styled.span`
  cursor: pointer;

  color: ${(props) => (props.isSelected ? '#D9695C' : '#828282')};
  font-size: ${(props) => (props.isSelected ? '28px' : '20px')};
  font-weight: ${(props) => (props.isSelected ? '700' : '500')};
`;

export const Or = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: 500;
`;

// 기타 - input 박스
export const OtherOptionWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const OtherInputWrapper = styled.div`
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

export const OtherInput = styled(Input)`
  width: 186px;
  height: 40px;
  padding: 11px 19px;

  font-size: 16px;
  color: #000;
  background: #fff;

  cursor: ${(props) => (props.readOnly ? 'pointer' : 'text')};
`;

export const SaveBtn = styled.button`
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
