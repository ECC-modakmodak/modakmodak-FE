import styled from '@emotion/styled';

export const DetailWrapper = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;

  background-color: #fff;
  border-radius: 30px;
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-top: 50px;

  gap: 56px;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 240px;
  gap: 37px;
`;
export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const HostIcon = styled.img`
  position: absolute;
  z-index: 1;
  width: 70px;
  height: 70px;
  top: -10px;
  right: -10px;
`;
export const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;
export const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 18px;
`;
export const Name = styled.h3`
  color: #000;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin: 0px;
`;

export const PodGoal = styled.div``;

export const InfoSection = styled.div`
  display: grid;
  gap: 22px;

  width: 377px;
`;

export const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 22px;
`;
export const InfoLabel = styled.h2`
  color: #000;
  text-align: right;
  font-size: 20px;
  font-weight: 500;
  margin: 8px 0px;
`;

export const Tags = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 6px;
`;
export const Tag = styled.div``;

export const AreaSection = styled.div`
  display: inline-flex;
  justify-content: left;
  align-items: flex-start;
  gap: 8px;

  p {
    color: #000;
    font-size: 20px;
    font-weight: 500;
    margin: 8px 0px;
  }
`;
export const AreaIcon = styled.img`
  width: 24px;
  height: 24px;
`;
export const ProgressContainer = styled.div`
  width: 232px;
  height: 27px;

  border-radius: 100px;
  background: #d9d9d9;
`;
export const ProgressBar = styled.div`
  width: ${(props) => props.width}%;
  height: 100%;

  border-radius: 100px;
  background: #65d95c;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 22px;
  margin-right: 23px;
`;
