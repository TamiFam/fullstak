import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import DashBoardLayout from "../dashboard/DashBoardLayout";
import Debtors from "../dashboard/Debtors";
import MyEnroll from '../dashboard/OtherWays/MyEnroll';
import MySelected from '../dashboard/OtherWays/MySelected';
import PaymentHistory from '../dashboard/OtherWays/PaymentHistory';
import ApplayForUnst from '../dashboard/OtherWays/ApplayForUnst';
import Setting from '../dashboard/OtherWays/Setting';
import Help from '../dashboard/OtherWays/Help'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardLayout />,
    children: [
      
      {
        path: '/debtors',
        element: <Debtors />,
      },
      {
        path: '/myEnroll',
        element: <MyEnroll />,
      },
      {
        path: '/mySelected',
        element: <MySelected />,
      },
      {
        path: '/paymentHistory', 
        element: <PaymentHistory />,
      },
      {
        path: '/applyForInst', 
        element: <ApplayForUnst />,
      },
      {
        path: '/setting', 
        element: <Setting />,
      },
      {
        path: '/help', 
        element: <Help />,
      },
      
    ],
  },
]);
