import styled from 'styled-components';

const OverlayForm = styled.div`
  position: fixed;
  width: 37%;
  right: 20px;
  bottom: 90px;
  z-index: 1025;
  background-color: #fff;
  box-shadow: 0px 15px 40px rgba(94, 92, 230, 0.3);
  border-radius: 5px;
`;
const FormHeader = styled.div`
  border-bottom: 1px solid #e2e8f0;
`;
const HeaderTitle = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: var(--black);
`;
const InputTaskName = styled.input`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: var(--black);
  height: 19px;
  border: 0;
  &:focus-visible {
    outline: none;
  }
`;
const LabelForm = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: var(--black);
`;
const FormProject = styled.input`
  width: 190px;
  height: 36px;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 100px;
  &:focus-visible {
    outline: 1px solid #e2e8f0;
  }
`;
const BtnAddUser = styled.div`
  cursor: pointer;
  border: 1px solid #e2e8f0;
  border-radius: 100%;
  height: 36px;
  width: 36px;
  text-align: center;
  line-height: 2.3;
  color: #9299a9;
`;
const AddAttc = styled.button`
  font-size: 13px;
  line-height: 150%;
  color: var(--black);
`;
const FormLbl = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 150%;
  margin-bottom: 8px;
  color: var(--black);
`;

export {
  OverlayForm,
  FormHeader,
  InputTaskName,
  LabelForm,
  FormProject,
  HeaderTitle,
  BtnAddUser,
  AddAttc,
  FormLbl,
};
