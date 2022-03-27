
import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyBLs1fF1FBzHT4DvlVW6I9PsX_4tALXEFk",
	authDomain: "projectonz.firebaseapp.com",
	projectId: "projectonz",
	storageBucket: "projectonz.appspot.com",
	messagingSenderId: "1032585287844",
	appId: "1:1032585287844:web:c76a26cf2e0e2605e3ee31"
};
console.log("toto");
const app = initializeApp(firebaseConfig);
export default app;