import styled from '@emotion/styled';

export const PopupContainer = styled.div`
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border: 1px solid #d9695c;
  border-radius: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 26px;
  right: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const PopupMainText = styled.p`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-top: 80px;

  span {
    color: #d9695c;
  }
`;
