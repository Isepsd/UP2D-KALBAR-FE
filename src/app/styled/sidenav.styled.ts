// import { CONFIG_DEVICE } from '@app/configs/device.config';
import styled from 'styled-components';

const SideNavContainer = styled.div`
  position: 'fixed';
  top: '0';
  z-index: 1024; 
`;

const Logo = styled.div`
  padding: 0.5rem 0.5rem;
  background: var(--primary);
  color: var(--primary-cc);
  height: 4.8rem;
`;

const SearchInput = styled.div`
  margin: 5.5rem 1rem 0.5rem 1rem;
`;

const SideNavDivider = styled.hr``;
const AvatarContent = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  border-radius: 6px;
  color: #fff;
`;
const CircleAvatar = styled.div`
  display: inline-table;
  vertical-align: middle;
  width: 2.5rem;
  height: 2.5rem;

  background-color: var(--black-100);
  border-radius: 25%;
  margin-right: 0.5rem;
`;

const FixedTopSidenav = styled.div`
  position: absolute;
  top: 0;
  z-index: 1024;
  background: var(--white);
  width: 100%;
`;

const WorkspaceSettings = styled.div`
  position: absolute;
  top: 0.85rem;
  right: 0;
`;

export {
  SideNavContainer,
  Logo,
  SearchInput,
  SideNavDivider,
  AvatarContent,
  CircleAvatar,
  FixedTopSidenav,
  WorkspaceSettings,
};
