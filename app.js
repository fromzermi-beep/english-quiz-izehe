// فایل JavaScript اصلی - بانک سوالات و منطق آزمون
// (نسخه اصلاح‌شده: رنگ دکمه‌های ناوبری و برخی اصلاحات جزئی برای اجرای صحیح)

// ==================== بانک سوالات (نمونه با 15 سوال) ====================
const questionBank = [
    // دسته گرامر (5 سوال)
    { id: 1, category: "گرامر", text: "She _____ to school every day.", options: ["go", "goes", "going", "went"], correct: 1 },
    { id: 2, category: "گرامر", text: "If I _____ you, I would study more.", options: ["am", "was", "were", "be"], correct: 2 },
    { id: 3, category: "گرامر", text: "They _____ football when it started to rain.", options: ["played", "were playing", "play", "are playing"], correct: 1 },
    { id: 4, category: "گرامر", text: "This is _____ book I told you about.", options: ["a", "an", "the", "-"], correct: 2 },
    { id: 5, category: "گرامر", text: "He _____ his homework yet.", options: ["didn't finish", "hasn't finished", "doesn't finish", "won't finish"], correct: 1 },

    // دسته واژگان (5 سوال)
    { id: 21, category: "واژگان", text: "معنی کلمه 'diligent' چیست؟", options: ["تنبل", "سخت‌کوش", "باهوش", "کم‌حوصله"], correct: 1 },
    { id: 22, category: "واژگان", text: "مترادف 'benevolent' کدام است؟", options: ["Kind", "Selfish", "Strict", "Clever"], correct: 0 },
    { id: 23, category: "واژگان", text: "کدام گزینه معنای 'postpone' را دارد؟", options: ["لغو کردن", "برگزاری", "به تعویق انداختن", "برنامه‌ریزی کردن"], correct: 2 },
    { id: 24, category: "واژگان", text: "مخالف 'ancient' چیست؟", options: ["Old", "Modern", "Historic", "Traditional"], correct: 1 },
    { id: 25, category: "واژگان", text: "معنای 'ubiquitous' چیست؟", options: ["نادر", "همه‌جا حاضر", "کوچک", "پیچیده"], correct: 1 },

    // دسته درک مطلب (5 سوال)
    { id: 36, category: "درک مطلب", text: "متن: 'John decided to invest in renewable energy. He believed it was crucial for the future of our planet.'\nسوال: چرا جان در انرژی‌های تجدیدپذیر سرمایه‌گذاری کرد؟", options: ["برای کسب سود کوتاه‌مدت", "برای آیندهٔ سیاره", "برای تعطیلی شرکت", "برای سرگرمی"], correct: 1 },
    { id: 37, category: "درک مطلب", text: "متن: 'Despite the heavy rain, the marathon continued as scheduled.'\nسوال: ماراتن چه شد؟", options: ["لغو شد", "به تعویق افتاد", "همان‌طور که برنامه بود ادامه یافت", "محل تغییر کرد"], correct: 2 },
    { id: 38, category: "درک مطلب", text: "متن: 'The company's profits soared after they introduced their innovative product line.'\nسوال: چه اتفاقی برای سود شرکت افتاد؟", options: ["کاهش یافت", "ثابت ماند", "افزایش چشمگیر یافت", "نابود شد"], correct: 2 },
    { id: 39, category: "درک مطلب", text: "متن: 'She was on the fence about which university to choose, both had excellent programs.'\nسوال: وضعیت او دربارهٔ انتخاب دانشگاه چگونه بود؟", options: ["کاملاً مطمئن بود", "در تردید بود", "هر دو دانشگاه را رد کرد", "دوستانش انتخاب کردند"], correct: 1 },
    { id: 40, category: "درک مطلب", text: "متن: 'The meeting was adjourned until further notice due to unforeseen circumstances.'\nسوال: جلسه چه شد؟", options: ["برگزار شد", "تا اطلاع ثانوی به تعویق افتاد", "به مکان دیگری منتقل شد", "به صورت آنلاین برگزار شد"], correct: 1 },
];

// شما می‌توانید سوالات بیشتری به questionBank اضافه کنید تا به تعداد دلخواه (مثلاً 50) برسد.

// ==================== متغیرهای اصلی ====================
let currentQuestionIndex = 0;
let userAnswers = [];
let userName = "";
let quizQuestions = [];
const QUESTIONS_PER_QUIZ = 15;

// ==================== انتخاب تصادفی سوالات ====================
function getRandomQuestions() {
    // اگر تعداد سوالات در بانک کمتر از QUESTIONS_PER_QUIZ باشد، همه را برمی‌گردانیم
    const pool = [...questionBank];
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(QUESTIONS_PER_QUIZ, pool.length));
}

// ==================== استایل دکمه‌های ناوبری (رنگ‌ها اصلاح شده) ====================
function applyNavButtonStyles() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    // اگر دکمه‌ها وجود ندارند، کاری انجام نمی‌دهیم
    if (!prevBtn || !nextBtn || !submitBtn) return;

    // پایه‌ای: رنگ متن و بردر و گوشه‌ها
    [prevBtn, nextBtn, submitBtn].forEach(btn => {
        btn.style.color = '#ffffff';
        btn.style.border = 'none';
        btn.style.borderRadius = '6px';
        btn.style.padding = '8px 14px';
        btn.style.fontSize = '14px';
        btn.style.transition = 'opacity 0.15s ease, transform 0.08s ease';
    });

    // رنگ‌های مشخص برای هر دکمه
    // دکمه قبلی: آبی ملایم
    prevBtn.dataset.enabledColor = '#0d6efd'; // bootstrap primary
    prevBtn.dataset.disabledColor = '#6c757d'; // gray

    // دکمه بعدی: سبز
    nextBtn.dataset.enabledColor = '#198754'; // bootstrap success
    nextBtn.dataset.disabledColor = '#6c757d';

    // دکمه ارسال: فیروزه‌ای / آبی-سبز
    submitBtn.dataset.enabledColor = '#0dcaf0'; // bootstrap info
    submitBtn.dataset.disabledColor = '#6c757d';

    // اعمال رنگ بر اساس وضعیت disabled
    [prevBtn, nextBtn, submitBtn].forEach(btn => {
        const isDisabled = btn.disabled;
        const color = isDisabled ? btn.dataset.disabledColor : btn.dataset.enabledColor;
        btn.style.backgroundColor = color;
        btn.style.opacity = isDisabled ? '0.65' : '1';
        btn.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
    });
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
    const avatarEl = document.getElementById('userAvatar');
    if (avatarEl) avatarEl.textContent = userName.charAt(0).toUpperCase();

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

    // ایمنی برای بررسی question
    if (!question) return;

    // به‌روزرسانی متن سوال
    const qTextEl = document.getElementById('questionText');
    if (qTextEl) qTextEl.textContent = question.text;
    const categoryTagEl = document.getElementById('categoryTag');
    if (categoryTagEl) categoryTagEl.textContent = question.category;

    // به‌روزرسانی شمارنده
    const counterEl = document.getElementById('questionCounter');
    if (counterEl) counterEl.textContent = `سوال ${currentQuestionIndex + 1} از ${Math.min(QUESTIONS_PER_QUIZ, quizQuestions.length)}`;

    // به‌روزرسانی نوار پیشرفت
    const progressPercent = ((currentQuestionIndex + 1) / Math.min(QUESTIONS_PER_QUIZ, quizQuestions.length)) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    // ساخت گزینه‌ها
    const optionsContainer = document.getElementById('optionsContainer');
    if (!optionsContainer) return;
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
            userAnswers[currentQuestionIndex] = parseInt(this.dataset.index, 10);

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
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    const hasAnswer = userAnswers[currentQuestionIndex] !== null;
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    // مدیریت دکمه "قبلی"
    if (prevBtn) prevBtn.disabled = isFirstQuestion;

    // مدیریت دکمه‌های "بعدی" و "مشاهده نتیجه"
    if (nextBtn && submitBtn) {
        if (isLastQuestion) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
            submitBtn.disabled = !hasAnswer;
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
            nextBtn.disabled = !hasAnswer;
        }
    }

    // اعمال رنگ/استایل دکمه‌ها بعد از تغییر وضعیت
    applyNavButtonStyles();
}

const prevBtnEl = document.getElementById('prevBtn');
if (prevBtnEl) {
    prevBtnEl.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });
}

const nextBtnEl = document.getElementById('nextBtn');
if (nextBtnEl) {
    nextBtnEl.addEventListener('click', function() {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    });
}

// ==================== محاسبه نتایج ====================
const submitBtnEl = document.getElementById('submitBtn');
if (submitBtnEl) {
    submitBtnEl.addEventListener('click', function() {
        calculateResults();
    });
}

function calculateResults() {
    // محاسبه امتیاز کلی
    let correctCount = 0;
    let categoryScores = { "گرامر": { correct: 0, total: 0 }, "واژگان": { correct: 0, total: 0 }, "درک مطلب": { correct: 0, total: 0 } };

    quizQuestions.forEach((question, index) => {
        if (!categoryScores[question.category]) {
            // در صورت وجود دسته‌بندی جدید، آن را مقداردهی اولیه می‌کنیم
            categoryScores[question.category] = { correct: 0, total: 0 };
        }
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
    const personalGreeting = document.getElementById('personalGreeting');
    if (personalGreeting) personalGreeting.textContent = `${results.userName} جان، نتیجه آزمونت اینه! 🎯`;

    const avatarEl = document.getElementById('userAvatar');
    if (avatarEl) avatarEl.textContent = results.userName.charAt(0).toUpperCase();

    const overallLevelEl = document.getElementById('overallLevel');
    if (overallLevelEl) overallLevelEl.textContent = results.overallLevel;

    // تنظیم امتیاز
    const finalScoreEl = document.getElementById('finalScore');
    if (finalScoreEl) finalScoreEl.textContent = results.totalScore;
    const correctCountEl = document.getElementById('correctCount');
    if (correctCountEl) correctCountEl.textContent = `${results.correctCount} از ${Math.min(QUESTIONS_PER_QUIZ, quizQuestions.length)}`;

    // تنظیم نمودار مهارت‌ها (در صورت وجود ساختار DOM)
    const grammarSkill = document.getElementById('grammarSkill');
    if (grammarSkill) {
        const fill = grammarSkill.querySelector('.skill-fill');
        const infoLast = grammarSkill.querySelector('.skill-info span:last-child');
        if (fill) fill.style.width = `${results.grammarPercent}%`;
        if (infoLast) infoLast.textContent = `${results.grammarPercent}٪`;
    }

    const vocabSkill = document.getElementById('vocabSkill');
    if (vocabSkill) {
        const fill = vocabSkill.querySelector('.skill-fill');
        const infoLast = vocabSkill.querySelector('.skill-info span:last-child');
        if (fill) fill.style.width = `${results.vocabPercent}%`;
        if (infoLast) infoLast.innerHTML = `${results.vocabPercent}٪ <span class="${results.vocabPercent >= 80 ? 'strength-label' : ''}">${results.vocabPercent >= 80 ? '← آفرین!' : ''}</span>`;
    }

    const comprehensionSkill = document.getElementById('comprehensionSkill');
    if (comprehensionSkill) {
        const fill = comprehensionSkill.querySelector('.skill-fill');
        const infoLast = comprehensionSkill.querySelector('.skill-info span:last-child');
        if (fill) fill.style.width = `${results.comprehensionPercent}%`;
        if (infoLast) infoLast.innerHTML = `${results.comprehensionPercent}٪ <span class="${results.comprehensionPercent <= 50 ? 'weakness-label' : ''}">${results.comprehensionPercent <= 50 ? '← نیاز به تمرین' : ''}</span>`;
    }

    // تنظیم پیام شخصی
    const personalizedMessageEl = document.getElementById('personalizedMessage');
    if (personalizedMessageEl) personalizedMessageEl.textContent = results.personalizedMessage;

    // تغییر به صفحه نتایج
    const quizScreen = document.getElementById('quizScreen');
    const resultScreen = document.getElementById('resultScreen');
    if (quizScreen) quizScreen.classList.remove('active');
    if (resultScreen) resultScreen.classList.add('active');
}

// ==================== آزمون مجدد ====================
const retestBtn = document.getElementById('retestBtn');
if (retestBtn) {
    retestBtn.addEventListener('click', function() {
        // بازنشانی متغیرها
        currentQuestionIndex = 0;
        userAnswers = [];
        quizQuestions = getRandomQuestions(); // سوالات جدید تصادفی
        userAnswers = new Array(quizQuestions.length).fill(null);

        // بازگشت به صفحه اول (برای وارد کردن نام جدید)
        const resultScreen = document.getElementById('resultScreen');
        const startScreen = document.getElementById('startScreen');
        if (resultScreen) resultScreen.classList.remove('active');
        if (startScreen) startScreen.classList.add('active');

        // پاک کردن نام قبلی
        const userNameInput = document.getElementById('userName');
        if (userNameInput) userNameInput.value = "";
    });
}

// ==================== اشتراک‌گذاری نتیجه ====================
const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', function() {
        const overallLevelText = document.getElementById('overallLevel') ? document.getElementById('overallLevel').textContent : '';
        if (navigator.share) {
            navigator.share({
                title: 'نتیجه آزمون زبان من',
                text: `من در آزمون زبان انگلیسی سطح ${overallLevelText} را کسب کردم!`,
                url: window.location.href
            });
        } else {
            // روش جایگزین برای مرورگرهایی که از Web Share API پشتیبانی نمی‌کنند
            const shareText = `نتیجه آزمون زبان انگلیسی من: سطح ${overallLevelText}`;
            alert(`می‌توانید این متن را کپی کنید:\n\n${shareText}`);
        }
    });
}

// ==================== مقداردهی اولیه ====================
// اطمینان از بارگیری صحیح DOM و اعمال استایل دکمه‌ها در ابتدای کار
document.addEventListener('DOMContentLoaded', function() {
    console.log("آزمون زبان انگلیسی ایذه آماده است!");
    // اعمال استایل اولیه دکمه‌ها (ممکن است عناصر هنوز در DOM نباشند؛ بنابراین تابع داخلی است)
    applyNavButtonStyles();
});