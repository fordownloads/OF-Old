import React from 'react';
import { navigate, Redirect, Router } from "@reach/router";
import { APP_CONFIG } from './app-config';
import { Splash } from "./components";
import { STORAGE } from './core';
import { Device, Build, Home, NotFound } from './pages';
import './styles/style.scss';

let isPushRegistered = false;

const registerPushListener = () => {
  if (navigator.serviceWorker === undefined || navigator.serviceWorker === null) {
    console.log("Service worker not found");
  } else {
    navigator.serviceWorker.addEventListener("message", ({ data }) => {
        const noty = data.firebaseMessaging.payload.notification;
        console.log("FCM recieved notification:");
        console.log(noty);
        new Notification(noty.title, noty);
      }
    );
    isPushRegistered = true;
    console.log("Push listener registered");
  }
}

function App() {
  const { pathname } = window.location;
  const locale = STORAGE.get('langof') || APP_CONFIG.defaultLang;
  const langReg = /^(([a-z]{2})|([a-z]{2}-[A-Za-z]{2,4}))$/; // tests "/en" OR "/en-US" lang format in url
  const pathLang = (pathname || '').split('/').filter(Boolean).shift() || '';

  if (!langReg.test(pathLang)) {
    // re-direct if path seems valid and localization is not present
    navigate(`/${locale}${pathname}`);
  }

  isPushRegistered || registerPushListener();

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
