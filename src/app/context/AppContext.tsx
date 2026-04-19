import { nanoid } from '@reduxjs/toolkit';
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from 'react';

type AppContextValue = {
  isVisible: boolean;
  onChangeVisible: (v: boolean) => void;
  searchValue: any;
  onChangeSearchValue: (v: any) => void;
  clickSubmit: any;
  onClickSubmit: (v: any) => void;
};

export const AppContext = createContext<AppContextValue | null>({
  isVisible: false,
  onChangeVisible: () => false,
  searchValue: '',
  onChangeSearchValue: () => '',
  clickSubmit: '',
  onClickSubmit: () => '',
});
AppContext.displayName = 'AppContext';

export const useApp = () => useContext(AppContext) as AppContextValue;

type Props = { children?: ReactNode };

export const AppProvider = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<any>('');
  const [clickSubmit, setClickSubmit] = useState<any>(nanoid());

  const onChangeVisible = useCallback(
    (newVisible: boolean) => {
      setIsVisible(!newVisible);
    },
    [isVisible]
  );

  const onChangeSearchValue = useCallback(
    (newSearchValue: any) => {
      setSearchValue(newSearchValue);
    },
    [isVisible]
  );
  
  const onClickSubmit = useCallback(
    (newSearchValue: any) => {
      setClickSubmit(newSearchValue);
    },
    [isVisible]
  );

  return (
    <AppContext.Provider
      value={{ isVisible, onChangeVisible, searchValue, onChangeSearchValue, clickSubmit, onClickSubmit }}
    >
      {children}
    </AppContext.Provider>
  );
}