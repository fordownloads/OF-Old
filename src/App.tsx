import React from 'react';
import { navigate, Redirect, Router } from "@reach/router";
import { APP_CONFIG } from './app-config';
import { Splash } from "./components";
import { STORAGE } from './core';
import { Device, Build, Home, NotFound } from './pages';
import { messaging } from "./init-fcm";
import { compose, lifecycle, withHandlers, withState } from "recompose";
import './styles/style.scss';
// @ts-ignore
const renderNotification = (notification, i) => <li key={i}>{notification}</li>;
// @ts-ignore
const registerPushListener = (pushNotification) =>
  navigator.serviceWorker.addEventListener("message", ({ data }) =>
    pushNotification(
      data.data
        ? data.data.message
        : data["firebase-messaging-msg-data"].data.message
    )
  );
// @ts-ignore
function App({token, notifications}) {
  const { pathname } = window.location;
  const locale = STORAGE.get<string>('langof') || APP_CONFIG.defaultLang;
  const langReg = /^(([a-z]{2})|([a-z]{2}-[A-Za-z]{2,4}))$/; // tests "/en" OR "/en-US" lang format in url
  const pathLang = (pathname || '').split('/').filter(Boolean).shift() || '';

  if (!langReg.test(pathLang)) {
    // re-direct if path seems valid and localization is not present
    navigate(`/${locale}${pathname}`);
  }

  console.log({token});

  return (<>
    <div></div>
    <ul>
      Notifications List:
      {notifications.map(renderNotification)}
    </ul>
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

export default compose(
  withState("token", "setToken", ""),
  withState("notifications", "setNotifications", []),
    // @ts-ignore
  withHandlers({
    // @ts-ignore
    pushNotification: ({ setNotifications, notifications}) => newNotification =>  setNotifications(notifications.concat(newNotification))
  }),
  lifecycle({
    async componentDidMount() {
      // @ts-ignore
      const { pushNotification, setToken } = this.props;

      messaging
        .requestPermission()
        .then(async function() {
          const token = await messaging.getToken();
          setToken(token);
        })
        .catch(function(err) {
          console.log("Unable to get permission to notify.", err);
        });

      registerPushListener(pushNotification);
    }
  })
)
// @ts-ignore
(App)
