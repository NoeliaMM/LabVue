import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// 🔥 Configuración de Firebase (usa tus propias credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyDHIiY5a_tYko76PnDhnfhAD8kdppyMdZ4",
  authDomain: "todolist-vue-b992b.firebaseapp.com",
  projectId: "todolist-vue-b992b",
  storageBucket: "todolist-vue-b992b.firebasestorage.app",
  messagingSenderId: "761761536328",
  appId: "1:761761536328:web:251965cd0d65ab5d337b7d"
};
// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Configuración de servicios
const db = getFirestore(firebaseApp); // Base de datos


export { db };



