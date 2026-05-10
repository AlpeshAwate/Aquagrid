import React from 'react';
import { renderToString } from 'react-dom/server';
import RetailDashboardPage from './src/pages/RetailDashboardPage.tsx';

try {
  const html = renderToString(React.createElement(RetailDashboardPage));
  console.log("RENDER SUCCESS. Length:", html.length);
} catch (e) {
  console.error("RENDER ERROR:", e);
}
