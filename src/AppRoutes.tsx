import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppElement from './AppElement';
import { IRoute } from './interfaces/route.interface';

const AppRoutes = ({ routes = [] }: { routes: IRoute[] }) => {
  return (
    <Routes>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<AppElement route={route} />}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
