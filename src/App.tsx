import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/Login/loginPage";
import PrivateRoute from "./Components/PrivateRoute/privateRoute";
import { IPrivateRouteProps } from "./Components/PrivateRoute/privateRoute.types";
import { RegisterPage } from "./Pages/Register/registerPage";
import { IssueItem } from "./Components/IssueItem/issueItem";
import { PhaseComponent } from "./Components/Phase/phase";
import { MainPage } from "./Pages/Main/mainPage";
import { initializeIcons } from "@fluentui/react";
import React from "react";
import { KanbanPage } from "./Pages/Kanban/kanbanPage";

export const App = (): JSX.Element => {
  React.useEffect(() => {
    initializeIcons();
  }, []);

  const defaultProtectedRouteProps: Omit<IPrivateRouteProps, 'outlet'> = {
    authenticationPath: '/login',
  };

  const isUserAuthenticated = (): boolean => {
    return false;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isUserAuthenticated() ? <MainPage /> : <LoginPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='issueTrackerApp' element={<PrivateRoute authenticationPath='/login' outlet={<MainPage />} />} />
        <Route path='kanban' element={<PrivateRoute authenticationPath='/login' outlet={<KanbanPage />} />} />
        <Route path='issue' element={<IssueItem issueId="dsadsa" />} />
      </Routes>
    </BrowserRouter>
  );
};
