/* ==================== استایل دکمه‌های ناوبری (سبز) ==================== */
.navigation-btn {
    background-color: #10b981; /* رنگ سبز اصلی */
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 2px 5px rgba(16, 185, 129, 0.2);
}

.navigation-btn:hover:not(:disabled) {
    background-color: #059669; /* سبز تیره‌تر برای hover */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

.navigation-btn:active:not(:disabled) {
    background-color: #047857; /* سبز تیره‌تر برای فعال */
    transform: translateY(0);
}

.navigation-btn:disabled {
    background-color: #d1fae5; /* سبز بسیار روشن برای غیرفعال */
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
}

/* دکمه‌های خاص */
#submitBtn {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

#submitBtn:hover:not(:disabled) {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
}

/* دکمه بازگشت */
#prevBtn {
    background-color: #10b981;
}

/* دکمه ادامه */
#nextBtn {
    background-color: #10b981;
}

/* دکمه‌های صفحه نتایج */
.action-btn {
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.action-btn:hover {
    background-color: #059669;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

#shareBtn {
    background-color: #34d399; /* سبز روشن‌تر */
}

#shareBtn:hover {
    background-color: #10b981;
}
