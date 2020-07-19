import React from 'react';
import { navigate, Redirect, Router } from "@reach/router";
import { APP_CONFIG } from './app-config';
import { Splash } from "./components";
import { STORAGE } from './core';
import { Device, Build, Home, NotFound } from './pages';
import './styles/style.scss';

function App() {
  const { pathname } = window.location;
  const locale = STORAGE.get('langof') || APP_CONFIG.defaultLang;
  const langReg = /^(([a-z]{2})|([a-z]{2}-[A-Za-z]{2,4}))$/; // tests "/en" OR "/en-US" lang format in url
  const pathLang = (pathname || '').split('/').filter(Boolean).shift() || '';

  if (!langReg.test(pathLang)) {
    // re-direct if path seems valid and localization is not present
    navigate(`/${locale}${pathname}`);
  }

  return (<>
    <div></div>
    <Router style={{ height: '100%' }} >
      <Home path="/:lang">
        <Splash path="/" />
        <Device path="/device/:code" />
        <Build path="/build/:code/:type/:version" />
        <NotFound default />
      </Home>
      <Redirect from="/" to={`/${locale}`} noThrow />
    </Router>
  </>);
}

export default App
