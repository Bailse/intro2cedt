document.addEventListener('DOMContentLoaded', () => {
    const categorySelection = document.getElementById('category-selection');
    const quizSection = document.getElementById('quiz-section');
    const resultSection = document.getElementById('result-section');
    const quizButtons = document.querySelectorAll('.quiz-btn');
    const submitBtn = document.getElementById('submit-quiz');
    const restartBtn = document.getElementById('restart-quiz');
    
    let currentCategory = '';

    const showSection = (section) => {
        categorySelection.style.display = 'none';
        quizSection.style.display = 'none';
        resultSection.style.display = 'none';
        section.style.display = 'block';
    };

    // เมื่อผู้ใช้คลิกปุ่มเลือกหมวดหมู่
    quizButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentCategory = button.dataset.category;
            document.getElementById('quiz-title').textContent = `แบบทดสอบ: ${button.textContent}`;
            showSection(quizSection);
            
            // โหลดคำถามและสร้าง HTML ขึ้นมา
            generateQuiz(currentCategory);
        });
    });

    // เมื่อผู้ใช้กดส่งคำตอบ
    submitBtn.addEventListener('click', () => {
        const results = submitAnswers(currentCategory);
        showSection(resultSection);
        displayResult(results);
    });

    // เมื่อผู้ใช้กดลองใหม่
    restartBtn.addEventListener('click', () => {
        showSection(categorySelection);
        submitBtn.style.display = 'none'; // ซ่อนปุ่ม "ดูผลลัพธ์"
    });

    // แสดงผลลัพธ์
    const displayResult = (result) => {
        document.getElementById('result-title').textContent = `คุณคือ ${result.name}!`;
        document.getElementById('result-image').src = result.image;
        document.getElementById('result-description').textContent = result.description;
    };
});
