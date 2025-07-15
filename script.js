import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://drosak-v2-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// زر التفعيل/إلغاء التفعيل
document.getElementById('lockToggle').addEventListener('change', function () {
  const isLocked = this.checked;
  set(ref(db, 'appSettings/lockEnabled'), isLocked);
});

// توليد المفتاح
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
    expiry: expiry,
    usedBy: null
  });

  document.getElementById('keyOutput').textContent = key;
}

// ✅ تحديث حالة الزر عند فتح التطبيق
onValue(ref(db, 'appSettings/lockEnabled'), (snapshot) => {
  const isLocked = snapshot.val();
  document.getElementById('lockToggle').checked = isLocked === true;
});
