// ข้อมูลแบบทดสอบทั้งหมด
const quizzes = {
    dog: [
        {
            question: "ถ้าคุณเป็นสุนัข คุณจะชอบกิจกรรมแบบไหน?",
            options: [
                { text: "วิ่งเล่นไล่ลูกบอลในสวน", value: "active" },
                { text: "นอนขดตัวบนโซฟา", value: "calm" }
            ]
        },
        {
            question: "คุณชอบอยู่คนเดียวหรือชอบอยู่กับคนเยอะๆ?",
            options: [
                { text: "ชอบอยู่กับคนเยอะๆ", value: "social" },
                { text: "ชอบอยู่คนเดียว", value: "independent" }
            ]
        }
    ],
    cat: [
        {
            question: "คุณชอบใช้เวลาว่างทำอะไร?",
            options: [
                { text: "ปีนป่ายไปในที่สูงๆ", value: "curious" },
                { text: "นอนหลับยาวๆ ทั้งวัน", value: "sleepy" }
            ]
        },
        {
            question: "คุณแสดงความรักต่อคนอื่นอย่างไร?",
            options: [
                { text: "คลอเคลียและร้องเบาๆ", value: "affectionate" },
                { text: "แค่มานั่งใกล้ๆ ก็พอ", value: "distant" }
            ]
        }
    ],
    mythical: [
        {
            question: "คุณอยากมีพลังวิเศษแบบไหน?",
            options: [
                { text: "บินได้", value: "flight" },
                { text: "พ่นไฟได้", value: "fire" }
            ]
        },
        {
            question: "ถ้าคุณเป็นผู้พิทักษ์ คุณจะปกป้องอะไร?",
            options: [
                { text: "ขุมทรัพย์ที่ซ่อนอยู่", value: "guard" },
                { text: "ป่าไม้และธรรมชาติ", value: "nature" }
            ]
        }
    ]
};

// ข้อมูลผลลัพธ์
const results = {
    dog: {
        active: { name: "โกลเด้น รีทรีฟเวอร์", image: "https://i.ibb.co/6803h7M/Golden-Retriever.png", description: "คุณเป็นคนร่าเริง เข้ากับคนง่ายและมีพลังงานล้นเหลือ!" },
        calm: { name: "ชิห์สุ", image: "https://i.ibb.co/T4Xh3T6/Shih-Tzu.png", description: "คุณเป็นคนสบายๆ รักความสงบและชอบใช้ชีวิตแบบเรียบง่าย" }
    },
    cat: {
        curious: { name: "วิเชียรมาศ", image: "https://i.ibb.co/tZ56M6r/Siamese-Cat.png", description: "คุณเป็นคนอยากรู้อยากเห็น ชอบสำรวจสิ่งใหม่ๆ" },
        sleepy: { name: "แมวเปอร์เซีย", image: "https://i.ibb.co/V9h43Wc/Persian-Cat.png", description: "คุณเป็นคนสุขุม ไม่เร่งรีบ และรักการพักผ่อนเป็นชีวิตจิตใจ" }
    },
    mythical: {
        flight: { name: "เพกาซัส", image: "https://i.ibb.co/qD6M3fX/Pegasus.png", description: "คุณเป็นคนรักอิสระและชอบที่จะโบยบินไปในที่ที่ต้องการ" },
        fire: { name: "มังกร", image: "https://i.ibb.co/k5z0z3C/Dragon.png", description: "คุณเป็นคนที่มีความยิ่งใหญ่ ทรงพลัง และน่าเกรงขาม" }
    }
};

// ฟังก์ชันสำหรับสร้างคำถาม
const generateQuiz = (category) => {
    const questionsContainer = document.getElementById('questions-container');
    const submitBtn = document.getElementById('submit-quiz');
    let answeredCount = 0;
    
    questionsContainer.innerHTML = '';
    
    quizzes[category].forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('option-group');
        
        q.options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.textContent = option.text;
            optionBtn.classList.add('option-btn');
            optionBtn.dataset.value = option.value;
            
            optionBtn.addEventListener('click', () => {
                // ลบการเลือกจากปุ่มอื่นในคำถามเดียวกัน
                optionsDiv.querySelectorAll('.option-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                optionBtn.classList.add('selected');
                
                // ตรวจสอบว่าตอบครบทุกข้อหรือยัง
                const allQuestions = questionsContainer.querySelectorAll('.question');
                let allAnswered = true;
                allQuestions.forEach(qDiv => {
                    if (!qDiv.querySelector('.option-btn.selected')) {
                        allAnswered = false;
                    }
                });
                
                // แสดงปุ่ม "ดูผลลัพธ์" เมื่อตอบครบ
                if (allAnswered) {
                    submitBtn.style.display = 'block';
                }
            });
            optionsDiv.appendChild(optionBtn);
        });
        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    });
};

// ฟังก์ชันสำหรับส่งคำตอบและคำนวณผลลัพธ์
const submitAnswers = (category) => {
    const selectedOptions = document.querySelectorAll('.option-btn.selected');
    const score = {};
    selectedOptions.forEach(btn => {
        const value = btn.dataset.value;
        score[value] = (score[value] || 0) + 1;
    });

    let highestScoreValue = '';
    let highestScore = 0;
    for (const key in score) {
        if (score[key] > highestScore) {
            highestScore = score[key];
            highestScoreValue = key;
        }
    }
    
    return results[category][highestScoreValue];
};