import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// ✅ تم ربطه بمشروعك الجديد
const firebaseConfig = {
  databaseURL: "https://drosak-v2-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// عند تغيير زر التفعيل
document.getElementById('lockToggle').addEventListener('change', function () {
  const isLocked = this.checked;
  set(ref(db, 'appSettings/lockEnabled'), isLocked)
    .then(() => {
      console.log("تم تحديث القفل:", isLocked);
    })
    .catch((error) => {
      console.error("خطأ في التحديث:", error);
    });
});

// توليد مفتاح
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

  set(ref(db, 'validKeys/' + key), {
    expiresAt: expiry,
    usedBy: null
  }).then(() => {
    document.getElementById('keyOutput').textContent = key;
  }).catch((error) => {
    console.error("فشل في حفظ المفتاح:", error);
  });
}
