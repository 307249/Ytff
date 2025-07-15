import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// إعدادات Firebase الجديدة
const firebaseConfig = {
  apiKey: "AIzaSyDVLILSHrL0jb8-c1PaxQlg8LmIVblSq4U",
  authDomain: "drosak-2f9fe.firebaseapp.com",
  databaseURL: "https://drosak-v2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "drosak-2f9fe",
  storageBucket: "drosak-2f9fe.appspot.com",
  messagingSenderId: "23383414815",
  appId: "1:23383414815:web:0dfd6a04f92b5e87099d2a"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ زر التفعيل للقفل
document.getElementById('lockToggle').addEventListener('change', function () {
  const isLocked = this.checked;
  set(ref(db, 'appSettings/lockEnabled'), isLocked)
    .then(() => console.log("تم تعديل حالة القفل:", isLocked))
    .catch(err => console.error("فشل في تعديل حالة القفل:", err));
});

// ✅ إنشاء المفاتيح بأنواعها
function generateKey(type) {
  const key = Math.floor(1000000 + Math.random() * 9000000).toString();
  let expiry = 0;

  if (type === '2h') {
    expiry = Date.now() + 2 * 60 * 60 * 1000; // ساعتين
  } else if (type === '1mo') {
    expiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // شهر
  } else if (type === '2026') {
    expiry = new Date('2026-07-10T23:59:59').getTime(); // حتى 10/7/2026
  }

  // إرسال المفتاح لقاعدة البيانات
  set(ref(db, 'validKeys/' + key), {
    expiresAt: expiry,
    usedBy: null
  })
  .then(() => {
    document.getElementById('keyOutput').textContent = key;
    console.log("✅ تم إنشاء المفتاح:", key);
  })
  .catch(err => {
    document.getElementById('keyOutput').textContent = "حدث خطأ!";
    console.error("❌ فشل في إنشاء المفتاح:", err);
  });
}

// جعل الدالة متاحة في HTML
window.generateKey = generateKey;
