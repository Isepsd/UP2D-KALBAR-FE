import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/** PROTECTED ROUTE / GUARD */
import ProtectedRoute from "@app/routes/ProtectedRoute";

import TopBarLoader from "@app/components/Loader/TopBarLoader";
import Error404 from "@app/components/Error/Error404";
import NotificationPopup from '@app/components/Notification/NotificationPopup';
import axios from "axios";
import { getByIdPath } from "./services/main.service";
import { setActiveFilters, setApplication } from "./store/reducers/ui";
import { stringToJSON } from "./helper/data.helper";
import { cdnUrl } from "./helper/cdn.helper";
import { setFavicons } from "./helper/app.helper";
import WpDetailPage from "./modules/WorkingPermit/WpDetailPage";

const Signin = React.lazy(() => import("@app/pages/Account/SigninPage"))
const Index = React.lazy(() => import("@app/pages/index") )
const ExtraRoute = React.lazy(() => import("@app/pages/Extra/ExtraRoute") )

function App(): React.ReactElement { 
  const source = axios.CancelToken.source();
  const dispatch = useDispatch()

  const { themeMode, application, loading } = useSelector((state: any) => state.ui);
 
  /** GET APPLICATION */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath(
        'application-setting-detail',
        process.env.APP_ID,
        source.token
      );
      
      if(req?.results){
        dispatch(setApplication(req?.results))
      } 
    } catch {}
  };
  
  useEffect(() => {
    if(!application){
      getDataById()
    }
    dispatch(setActiveFilters({filters:{},count:0}));
  
    return () => {
      source.cancel()
    }
  }, [])

  useEffect(() => {
    if(application) {
      initTheme()
      initFont(stringToJSON(application?.font))
      setFavicons(cdnUrl(application?.favicon))
    }
  }, [application]) 

  /** INIT THEME */
  function initTheme(){
    document.documentElement.setAttribute("theme", (application?.layout) ? application?.layout: 'lembang')
    document.documentElement.setAttribute("theme-fontsize", (application?.scaling) ? application?.scaling: 'small')
    document.body.setAttribute('theme-color', application?.colors? application?.colors: 'enamel-blue')
  }

  /** INIT FONT */
  function initFont(f:any){
    const fontElmRel = document.getElementById("font-family-url")
    const fontElmStyle = document.getElementById("font-family")
    
    if(fontElmStyle){fontElmStyle.remove()} 
    if(fontElmRel){fontElmRel.remove()}

    let link = document.createElement('link');
        link.id = "font-family-url"
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        // link.setAttribute('href', f?.fontUrl); 

    if(f?.fontUrl){document.head.appendChild(link);}
    document.head.insertAdjacentHTML("beforeend", `<style id="font-family">html, body{font-family:-apple-system, ${f?.font}, 'Inter', "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"};textarea{font-family: ${f?.font}}</style>`)
  }
   
  useEffect(() => {
    document.documentElement.setAttribute('theme-mode', themeMode || 'light');
  }, [themeMode]);
  
  return (
    <>
      <TopBarLoader isLoading={loading} />
      
      <Router>
        <Routes>
          <Route
            path='signin'
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Signin />
              </React.Suspense>
            }
          />
          <Route
            path='extra/*'
            element={
              <ProtectedRoute>
                <React.Suspense fallback={<TopBarLoader />}>
                  <ExtraRoute />
                </React.Suspense>
              </ProtectedRoute>
            }
          />
          <Route path='/*'>
            <Route path="wm/working-permit/wp-detail/:id" element={<React.Suspense fallback={<TopBarLoader />}><WpDetailPage /></React.Suspense>} />  
            <Route
              path='*'
              element={
                <ProtectedRoute> 
                  <React.Suspense fallback={<TopBarLoader />}>
                    <Index />
                  </React.Suspense>
                </ProtectedRoute>
              }
            /> 
          </Route> 
          
          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>
      <NotificationPopup />
    </>
  );
}

export default App;