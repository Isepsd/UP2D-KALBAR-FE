import styled from 'styled-components';

import { FontInterWeightNormal, TitleSize } from './utils.styled';

export const HeaderTitle = styled.div`
  ${FontInterWeightNormal}
  font-size: 13px;
  line-height: 16px;
  color: var(--black-800);
`;

export const IconAttc = styled.div`
  background: #e2e8f0;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  padding: 2px 7px;
  width: 28px;
  height: 28px;
  text-align: center;
  font-size: 14px;
`;
export const DescFile = styled.div`
  ${FontInterWeightNormal}
  font-size: 12px;
  line-height: 15px;
  color: var(--black);
  svg {
    width: 12px !important;
  }
`;

export const SideDetail = styled.div`
  position: fixed;
  width: 402px;
  height: 100vh;
  right: 0;
  bottom: 0;
  z-index: 1025;
  background-color: var(--white);
  box-shadow: -20px 0px 40px rgba(var(--black-900-rgb), 0.05);
  border-left: 1px solid var(--black-50);
`;
export const ContainerForm = styled.div`
  height: calc(100vh - 55px);
`;
export const Title = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
`;
export const Status = styled.div`
  ${TitleSize};
  color: var(--black);
`;
export const ProfileImageSm = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 100%;
`;
export const ProjectManName = styled.span`

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;
export const InputChecklist = styled.input`
  height: 24px;
  border: none;
  box-sizing: border-box;
  &:focus-visible {
    outline: none;
  }
`;

export const FormComment = styled.input`

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  background: #f8f9fe;
  border-radius: 5px;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;
export const WrapperCommand = styled.div`
  border-top: 1px solid #e2e8f0;
`;
export const SubReply = styled.div`
  margin-left: 30px;
`;
export const ReplyBtn = styled.span`

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  color: var(--primary);
`;
export const StatusMonitoring = styled.div`
  position: absolute;
  width: 71px;
  height: 23px;
  right: 0;
  top: 0;
  border-radius: 0px 5px 0px 10px;
`;

export const InputWorkspace = styled.input`
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: var(--black);
  border: none;
  border-bottom: 1px solid #e2e8f0;
  &:focus-visible {
    outline: none;
    border-bottom: 1px solid var(--primary);
  }
`;
export const TypeWorkspace = styled.div`
  border: 1px solid #e2e8f0;
`;
export const ProjectNameInitial = styled.div`
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 2;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
`;
