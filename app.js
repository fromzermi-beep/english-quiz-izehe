/* استایل دکمه‌های ناوبری */
.nav-btn {
  background-color: #1e88e5; /* آبی واضح */
  color: #ffffff;            /* متن سفید برای کنتراست */
  border: none;
  padding: 10px 16px;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.12s ease, transform 0.08s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

/* هاور وقتی فعال است */
.nav-btn:hover:not([disabled]) {
  background-color: #1565c0; /* تیره‌تر برای بازخورد */
  transform: translateY(-1px);
}

/* حالت غیرفعال */
.nav-btn[disabled],
.nav-btn[aria-disabled="true"] {
  background-color: #bdbdbd;
  color: #ffffff;
  cursor: not-allowed;
  opacity: 0.95;
  box-shadow: none;
}

/* دکمه submit ممکنه متمایز باشه */
#submitBtn.nav-btn {
  background-color: #2e7d32; /* سبز برای نهایی‌سازی */
}
#submitBtn.nav-btn:hover:not([disabled]) {
  background-color: #256126;
  }}

// ==================== نمایش نتایج ====================
function displayResults(results) {
    // تنظیم اطلاعات کاربر
    document.getElementById('personalGreeting').textContent = `${results.userName} جان، نتیجه آزمونت اینه! 🎯`;
    document.getElementById('userAvatar').textContent = results.userName.charAt(0).toUpperCase();
    document.getElementById('overallLevel').textContent = results.overallLevel;
    
    // تنظیم امتیاز
    document.getElementById('finalScore').textContent = results.totalScore;
    document.getElementById('correctCount').textContent = `${results.correctCount} از ${QUESTIONS_PER_QUIZ}`;
    
    // تنظیم نمودار مهارت‌ها
    document.getElementById('grammarSkill').querySelector('.skill-fill').style.width = `${results.grammarPercent}%`;
    document.getElementById('grammarSkill').querySelector('.skill-info span:last-child').textContent = `${results.grammarPercent}٪`;
    
    document.getElementById('vocabSkill').querySelector('.skill-fill').style.width = `${results.vocabPercent}%`;
    document.getElementById('vocabSkill').querySelector('.skill-info span:last-child').innerHTML = 
        `${results.vocabPercent}٪ <span class="${results.vocabPercent >= 80 ? 'strength-label' : ''}">${results.vocabPercent >= 80 ? '← آفرین!' : ''}</span>`;
    
    document.getElementById('comprehensionSkill').querySelector('.skill-fill').style.width = `${results.comprehensionPercent}%`;
    document.getElementById('comprehensionSkill').querySelector('.skill-info span:last-child').innerHTML = 
        `${results.comprehensionPercent}٪ <span class="${results.comprehensionPercent <= 50 ? 'weakness-label' : ''}">${results.comprehensionPercent <= 50 ? '← نیاز به تمرین' : ''}</span>`;
    
    // تنظیم پیام شخصی
    document.getElementById('personalizedMessage').textContent = results.personalizedMessage;
    
    // تغییر به صفحه نتایج
    document.getElementById('quizScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
}

// ==================== آزمون مجدد ====================
document.getElementById('retestBtn').addEventListener('click', function() {
    // بازنشانی متغیرها
    currentQuestionIndex = 0;
    userAnswers = [];
    quizQuestions = getRandomQuestions(); // سوالات جدید تصادفی
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    // بازگشت به صفحه اول (برای وارد کردن نام جدید)
    document.getElementById('resultScreen').classList.remove('active');
    document.getElementById('startScreen').classList.add('active');
    
    // پاک کردن نام قبلی
    document.getElementById('userName').value = "";
});

// ==================== اشتراک‌گذاری نتیجه ====================
document.getElementById('shareBtn').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'نتیجه آزمون زبان من',
            text: `من در آزمون زبان انگلیسی سطح ${document.getElementById('overallLevel').textContent} را کسب کردم!`,
            url: window.location.href
        });
    } else {
        // روش جایگزین برای مرورگرهایی که از Web Share API پشتیبانی نمی‌کنند
        const shareText = `نتیجه آزمون زبان انگلیسی من: سطح ${document.getElementById('overallLevel').textContent}`;
        alert(`می‌توانید این متن را کپی کنید:\n\n${shareText}`);
    }
});

// ==================== مقداردهی اولیه ====================
// اطمینان از بارگیری صحیح DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log("آزمون زبان انگلیسی ایذه آماده است!");
});
