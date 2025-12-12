
// فایل JavaScript اصلی - بانک سوالات و منطق آزمون

// ==================== بانک سوالات (50 سوال) ====================
const questionBank = [
    // دسته گرامر (20 سوال)
    { id: 1, category: "گرامر", text: "She _____ to school every day.", options: ["go", "goes", "going", "went"], correct: 1 },
    { id: 2, category: "گرامر", text: "If I _____ you, I would study more.", options: ["am", "was", "were", "be"], correct: 2 },
    { id: 3, category: "گرامر", text: "They _____ football when it started to rain.", options: ["played", "were playing", "play", "are playing"], correct: 1 },
    { id: 4, category: "گرامر", text: "This is _____ book I told you about.", options: ["a", "an", "the", "-"], correct: 2 },
    { id: 5, category: "گرامر", text: "He _____ his homework yet.", options: ["didn't finish", "hasn't finished", "doesn't finish", "won't finish"], correct: 1 },
    
    // دسته واژگان (15 سوال)
    { id: 21, category: "واژگان", text: "معنی کلمه 'diligent' چیست؟", options: ["تنبل", "سخت‌کوش", "باهوش", "کم‌حوصله"], correct: 1 },
    { id: 22, category: "واژگان", text: "مترادف 'benevolent' کدام است؟", options: ["Kind", "Selfish", "Strict", "Clever"], correct: 0 },
    { id: 23, category: "واژگان", text: "کدام گزینه معنای 'postpone' را دارد؟", options: ["لغو کردن", "برگزاری", "به تعویق انداختن", "برنامه‌ریزی"], correct: 2 },
    { id: 24, category: "واژگان", text: "مخالف 'ancient' چیست؟", options: ["Old", "Modern", "Historic", "Traditional"], correct: 1 },
    { id: 25, category: "واژگان", text: "معنای 'ubiquitous' چیست؟", options: ["نادر", "همه‌جا حاضر", "کوچک", "پیچیده"], correct: 1 },
    
    // دسته درک مطلب (15 سوال)
    { id: 36, category: "درک مطلب", text: "متن: 'John decided to invest in renewable energy. He believed it was crucial for the future of our planet.'\nسوال: چرا جان در انرژی تجدیدپذیر سرمایه‌گذاری کرد؟", options: ["برای سود بیشتر", "برای آینده سیاره زمین", "به توصیه دوستش", "قانون آن کشور اینطور بود"], correct: 1 },
    { id: 37, category: "درک مطلب", text: "متن: 'Despite the heavy rain, the marathon continued as scheduled.'\nسوال: دوی ماراتن چه شد؟", options: ["لغو شد", "به تعویق افتاد", "طبق برنامه ادامه یافت", "به مکانی سرپوشیده منتقل شد"], correct: 2 },
    { id: 38, category: "درک مطلب", text: "متن: 'The company's profits soared after they introduced their innovative product line.'\nسوال: چه اتفاقی برای سود شرکت افتاد؟", options: ["کاهش یافت", "ثابت ماند", "به شدت افزایش یافت", "نوسان داشت"], correct: 2 },
    { id: 39, category: "درک مطلب", text: "متن: 'She was on the fence about which university to choose, both had excellent programs.'\nسوال: وضعیت او درباره انتخاب دانشگاه چگونه بود؟", options: ["مطمئن بود", "بی‌تفاوت بود", "مردد بود", "ناراضی بود"], correct: 2 },
    { id: 40, category: "درک مطلب", text: "متن: 'The meeting was adjourned until further notice due to unforeseen circumstances.'\nسوال: جلسه چه شد؟", options: ["برگزار شد", "به وقت دیگری موکول شد", "کامل شد", "حذف شد"], correct: 1 }
];

// شما می‌توانید 35 سوال دیگر به همین شیوه اضافه کنید
// برای نمونه، من فقط 15 سوال قرار دادم. در نسخه کامل 50 سوال خواهد بود.

// ==================== متغیرهای اصلی ====================
let currentQuestionIndex = 0;
let userAnswers = [];
let userName = "";
let quizQuestions = [];
const QUESTIONS_PER_QUIZ = 15;

// ==================== انتخاب تصادفی سوالات ====================
function getRandomQuestions() {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, QUESTIONS_PER_QUIZ);
}

// ==================== شروع آزمون ====================
document.getElementById('startBtn').addEventListener('click', function() {
    userName = document.getElementById('userName').value.trim();
    
    if (!userName) {
        alert("لطفاً نام خود را وارد کنید.");
        return;
    }
    
    // انتخاب سوالات تصادفی
    quizQuestions = getRandomQuestions();
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    // تنظیم آواتار کاربر
    document.getElementById('userAvatar').textContent = userName.charAt(0).toUpperCase();
    
    // تغییر صفحه
    document.getElementById('startScreen').classList.remove('active');
    document.getElementById('quizScreen').classList.add('active');
    
    // نمایش اولین سوال
    currentQuestionIndex = 0;
    loadQuestion();
});

// ==================== بارگذاری سوال ====================
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // به‌روزرسانی متن سوال
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('categoryTag').textContent = question.category;
    
    // به‌روزرسانی شمارنده
    document.getElementById('questionCounter').textContent = 
        `سوال ${currentQuestionIndex + 1} از ${QUESTIONS_PER_QUIZ}`;
    
    // به‌روزرسانی نوار پیشرفت
    const progressPercent = ((currentQuestionIndex + 1) / QUESTIONS_PER_QUIZ) * 100;
    document.getElementById('progressBar').style.width = `${progressPercent}%`;
    
    // ساخت گزینه‌ها
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = "";
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.textContent = `${String.fromCharCode(97 + index)}) ${option}`;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', function() {
            // حذف انتخاب از همه گزینه‌ها
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // انتخاب گزینه جدید
            this.classList.add('selected');
            userAnswers[currentQuestionIndex] = parseInt(this.dataset.index);
            
            // فعال/غیرفعال کردن دکمه‌ها
            updateNavigationButtons();
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // به‌روزرسانی دکمه‌های ناوبری
    updateNavigationButtons();
}
// ==================== مدیریت دکمه‌های ناوبری ====================
function updateNavigationButtons() {
    const hasAnswer = userAnswers[currentQuestionIndex] !== null;
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
    
    // مدیریت دکمه "قبلی"
    const prevBtn = document.getElementById('prevBtn');
    prevBtn.disabled = isFirstQuestion;
    
    // مدیریت دکمه‌های "بعدی" و "مشاهده نتیجه"
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (isLastQuestion) {
        // اگر در آخرین سوال هستیم
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
        submitBtn.disabled = !hasAnswer;
    } else {
        // اگر در سوالات میانی هستیم
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
        nextBtn.disabled = !hasAnswer;
    }
                                              }
document.getElementById('prevBtn').addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

document.getElementById('nextBtn').addEventListener('click', function() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

// ==================== محاسبه نتایج ====================
document.getElementById('submitBtn').addEventListener('click', function() {
    calculateResults();
});

function calculateResults() {
    // محاسبه امتیاز کلی
    let correctCount = 0;
    let categoryScores = { "گرامر": { correct: 0, total: 0 }, "واژگان": { correct: 0, total: 0 }, "درک مطلب": { correct: 0, total: 0 } };
    
    quizQuestions.forEach((question, index) => {
        categoryScores[question.category].total++;
        
        if (userAnswers[index] === question.correct) {
            correctCount++;
            categoryScores[question.category].correct++;
        }
    });
    
    const totalScore = Math.round((correctCount / quizQuestions.length) * 100);
    
    // محاسبه درصد هر مهارت
    const grammarPercent = categoryScores["گرامر"].total > 0 ? 
        Math.round((categoryScores["گرامر"].correct / categoryScores["گرامر"].total) * 100) : 0;
    const vocabPercent = categoryScores["واژگان"].total > 0 ? 
        Math.round((categoryScores["واژگان"].correct / categoryScores["واژگان"].total) * 100) : 0;
    const comprehensionPercent = categoryScores["درک مطلب"].total > 0 ? 
        Math.round((categoryScores["درک مطلب"].correct / categoryScores["درک مطلب"].total) * 100) : 0;
    
    // تعیین سطح کلی
    let overallLevel, levelMessage;
    if (totalScore >= 90) {
        overallLevel = "پیشرفته (C1-C2)";
        levelMessage = "سطح بسیار عالی دارید!";
    } else if (totalScore >= 70) {
        overallLevel = "متوسط رو به بالا (B2)";
        levelMessage = "در مسیر درستی هستید.";
    } else if (totalScore >= 50) {
        overallLevel = "متوسط (B1)";
        levelMessage = "نیاز به تمرین بیشتر دارید.";
    } else {
        overallLevel = "مبتدی (A1-A2)";
        levelMessage = "نیاز به یادگیری پایه دارید.";
    }
    
    // پیدا کردن قوی‌ترین و ضعیف‌ترین مهارت
    const skillPercentages = [
        { name: "گرامر", percent: grammarPercent },
        { name: "واژگان", percent: vocabPercent },
        { name: "درک مطلب", percent: comprehensionPercent }
    ];
    
    skillPercentages.sort((a, b) => b.percent - a.percent);
    const strongestSkill = skillPercentages[0];
    const weakestSkill = skillPercentages[2];
    
    // تولید پیام شخصی‌شده
    let personalizedMessage = `${userName} جان، `;
    if (strongestSkill.percent >= 80) {
        personalizedMessage += `مهارت ${strongestSkill.name} شما عالیه! `;
    }
    
    if (weakestSkill.percent <= 50) {
        personalizedMessage += `برای پیشرفت بیشتر، روی ${weakestSkill.name} تمرکز کنید.`;
    } else {
        personalizedMessage += `همه مهارت‌های شما در سطح قابل قبولی است.`;
    }
    
    // نمایش نتایج
    displayResults({
        userName,
        totalScore,
        correctCount,
        overallLevel,
        levelMessage,
        grammarPercent,
        vocabPercent,
        comprehensionPercent,
        personalizedMessage
    });
}

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
