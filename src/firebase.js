import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, onValue, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCbwGeLzVazJDpTtv-piMnmD-jxKmSH7O8",
  authDomain: "impostor-tico.firebaseapp.com",
  databaseURL: "https://impostor-tico-default-rtdb.firebaseio.com",
  projectId: "impostor-tico",
  storageBucket: "impostor-tico.firebasestorage.app",
  messagingSenderId: "1093027182868",
  appId: "1:1093027182868:web:0b7a0a871119212c7a6a01",
  measurementId: "G-1W17X5KV7R"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// const analytics = getAnalytics(app);

// Implementar window.storage usando Firebase
window.storage = {
  async get(key) {
    const snapshot = await get(ref(database, key));
    if (snapshot.exists()) {
      return { key, value: snapshot.val(), shared: true };
    }
    return null;
  },
  
  async set(key, value) {
    await set(ref(database, key), value);
    return { key, value, shared: true };
  },
  
  async delete(key) {
    await remove(ref(database, key));
    return { key, deleted: true, shared: true };
  },
  
  onValue(key, callback) {
    return onValue(ref(database, key), (snapshot) => {
      if (snapshot.exists()) {
        callback({ key, value: snapshot.val() });
      }
    });
  }
};

export default database;