import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/Login/loginPage";
import PrivateRoute from "./Components/PrivateRoute/privateRoute";
import { IPrivateRouteProps } from "./Components/PrivateRoute/privateRoute.types";
import { RegisterPage } from "./Pages/Register/registerPage";
import { IssueItem } from "./Components/IssueItem/issueItem";
import { IssuePhaseComponent } from "./Components/IssuePhase/issuePhase";

export const App = (): JSX.Element => {
  const defaultProtectedRouteProps: Omit<IPrivateRouteProps, 'outlet'> = {
    authenticationPath: '/login',
  };

  const isUserAuthenticated = (): boolean => {
    return false;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isUserAuthenticated() ? <div> app</div> : <LoginPage /> }/>
        <Route path='login' element={<LoginPage />}/>
        <Route path='register' element={<RegisterPage />}/>
        <Route path='issueTrackerApp' element={<PrivateRoute authenticationPath='/login' outlet={<div>app</div>} />} />
        <Route path='issue' element={<IssueItem issueId="dsadsa"/>} />
        <Route path='issuePhase' element={<IssuePhaseComponent issuePhaseId="dsadsa"/>} />
      </Routes>
    </BrowserRouter>
  );
};
