// تهيئة Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDVLILSHrL0jb8-c1PaxQlg8LmIVblSq4U",
  authDomain: "drosak-2f9fe.firebaseapp.com",
  databaseURL: "https://drosak-v2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "drosak-2f9fe",
  storageBucket: "drosak-2f9fe.appspot.com",
  messagingSenderId: "23383414815",
  appId: "1:23383414815:web:0dfd6a04f92b5e87099d2a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// تفعيل القفل أو إلغاؤه
document.getElementById('lockToggle').addEventListener('change', function () {
  const isLocked = this.checked;
  firebase.database().ref('appSettings/lockEnabled').set(isLocked);
});

// توليد مفتاح حسب المدة
function generateKey(type) {
  const key = Math.floor(1000000 + Math.random() * 9000000).toString();
  let expiry = 0;

  if (type === '2h') {
    expiry = Date.now() + 2 * 60 * 60 * 1000;
  } else if (type === '1mo') {
    expiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
  } else if (type === '2026') {
    expiry = new Date('2026-07-10T23:59:59').getTime();
  }

  firebase.database().ref('validKeys/' + key).set({
    expiresAt: expiry,
    usedBy: null
  });

  document.getElementById('keyOutput').textContent = key;
}
