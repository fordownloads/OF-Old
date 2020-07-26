import * as firebase from "firebase/app";
import "firebase/messaging";

const push_server = "https://push.orangefox.download";
let messaging = null;

if (firebase.messaging.isSupported()) {
const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAwQ-n44Z0WaaZfBqfxhhzNEuNiihnOvG8",
    projectId: "orangefox-push",
    messagingSenderId: "62815877980",
    appId: "1:62815877980:web:7335752aa695d1489c9f99"
});

messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
  "BLQVrxOg1gSWtPIvNjO5Wa_WwwA8hgwNaJ4YHLBIWxRxJc1JelTifFhBArRwAskFSrxmjAhxWKvH3FhNHosH4Fc"
);
} else {
  console.error("FCM is not supported");
}

export { messaging, push_server };