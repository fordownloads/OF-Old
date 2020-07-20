importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyAwQ-n44Z0WaaZfBqfxhhzNEuNiihnOvG8",
  projectId: "orangefox-push",
  messagingSenderId: "62815877980",
  appId: "1:62815877980:web:7335752aa695d1489c9f99"
});
const messaging = firebase.messaging();

/*
messaging.setBackgroundMessageHandler(function(payload) {
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});*/