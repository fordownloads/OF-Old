import * as firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAwQ-n44Z0WaaZfBqfxhhzNEuNiihnOvG8",
    authDomain: "orangefox-push.firebaseapp.com",
    databaseURL: "https://orangefox-push.firebaseio.com",
    projectId: "orangefox-push",
    storageBucket: "orangefox-push.appspot.com",
    messagingSenderId: "62815877980",
    appId: "1:62815877980:web:7335752aa695d1489c9f99",
    measurementId: "G-TQMD0X716C"
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
  "BLQVrxOg1gSWtPIvNjO5Wa_WwwA8hgwNaJ4YHLBIWxRxJc1JelTifFhBArRwAskFSrxmjAhxWKvH3FhNHosH4Fc"
);

export { messaging };