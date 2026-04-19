import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import _head from 'lodash/head';

import { getItem } from "@app/helper/localstorage.helper";
import moment from "moment";
import { useSelector } from "react-redux";
import { initFlatMenu } from "@app/helper/menu.helper";
import { concat, get } from "lodash";
import { MENU } from "@app/configs/menu.config";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import Error500 from "@app/components/Error/Error500";
import { Container } from "react-bootstrap";

export const AuthCheck = (): any =>{
  let auth = false
  
  const userLoggedIn =  getItem('credentials') 

  if(userLoggedIn && userLoggedIn.hasOwnProperty("access") ){
    const prevAccepted = getItem("accepted");

    const expirationDuration = 1000 * 60 * 60 * (prevAccepted?.remember_me ? 24*14 : 24*3); // 1 days default if remember 3 weeks
    const currentTime:any = moment().valueOf();
    const notAccepted = prevAccepted?.time == undefined;
    const prevAcceptedExpired = prevAccepted?.time != undefined && currentTime - prevAccepted?.time > expirationDuration;

    if (notAccepted || prevAcceptedExpired) {
      auth = false
      localStorage.clear()
    }else{
      auth = true
    }
  }
  
  return auth
}

interface Props {
  children: JSX.Element
  path?: string
}

const ProtectedRoutes: React.FC<Props> = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = AuthCheck() // get from state
  const [roleAccessCheck, setUserHasRequiredRole] = useState<any>()
  const { navigation } = useSelector((state: any) => state.ui);

  useEffect(() => {
    const flatNavigation = initFlatMenu(navigation);
    const navs = concat(flatNavigation, MENU)
    const activePage: any = _head(
      navs?.filter((f: any) => f?.path!='' && location?.pathname.includes(f?.path))
    );

  if(location?.pathname=='/' && activePage==undefined){
    const redirectTarget = get(navigation, '[0].children')?.length==0 ? get(navigation, '[0]') : get(navigation, '[0].children[0]')
    if(redirectTarget){
      navigate(redirectTarget?.path)
    }
  }


    const checkingRoleAccess = activePage ? ROLE_ACTION(ROLE_ACCESS(activePage?.name), 'view') : true
    setUserHasRequiredRole(checkingRoleAccess)
  }, [location])

  if (isAuthenticated && roleAccessCheck) {
    return children
  }

  if(isAuthenticated && roleAccessCheck==undefined){
    return <></>
  }else if (isAuthenticated && !roleAccessCheck) {
    return <Container><Error500 /></Container>
  }

  return <Navigate to="/signin" />
}

export default ProtectedRoutes