let hp = 5;
let exp = 0;
let currentStep = 0;
let currentGameMode = "";

// --- DATA SOAL QUIZ (15 SOAL SIMPLE PRESENT TENSE) ---
const quizQuestions = [
    { q: "She ___ to school every day.", o: ["Go", "Goes", "Going"], a: 1, ex: "Subjek 'She' menggunakan Verb+s/es." },
    { q: "I ___ not like coffee.", o: ["Do", "Does", "Am"], a: 0, ex: "Subjek 'I' menggunakan 'Do' dalam kalimat negatif." },
    { q: "___ they play football?", o: ["Does", "Is", "Do"], a: 2, ex: "Subjek jamak 'They' menggunakan 'Do' untuk bertanya." },
    { q: "The sun ___ in the east.", o: ["Rise", "Rises", "Rising"], a: 1, ex: "Fakta alam menggunakan V+s (Rises)." },
    { q: "We ___ students.", o: ["Are", "Is", "Am"], a: 0, ex: "Subjek 'We' menggunakan 'Are'." },
    { q: "Cats ___ fish.", o: ["Like", "Likes", "Liking"], a: 0, ex: "Cats (jamak) menggunakan Verb dasar (Like)." },
    { q: "He ___ a book every night.", o: ["Read", "Reads", "Reading"], a: 1, ex: "Subjek 'He' butuh Verb+s (Reads)." },
    { q: "You ___ happy today.", o: ["Am", "Is", "Look"], a: 2, ex: "'Look' (terlihat) cocok untuk keadaan." },
    { q: "Does she ___ English?", o: ["Speak", "Speaks", "Speaking"], a: 0, ex: "Setelah 'Does', Verb kembali ke dasar (Speak)." },
    { q: "It ___ often rain in winter.", o: ["Do", "Does", "Is"], a: 1, ex: "Subjek 'It' menggunakan 'Does'." },
    { q: "I always ___ up at 5 AM.", o: ["Wake", "Wakes", "Woke"], a: 0, ex: "Subjek 'I' menggunakan Verb dasar." },
    { q: "They ___ not work on Sundays.", o: ["Do", "Does", "Are"], a: 0, ex: "Subjek 'They' menggunakan 'Do'." },
    { q: "My father ___ a doctor.", o: ["Am", "Is", "Are"], a: 1, ex: "Ayah (Tunggal) menggunakan 'Is'." },
    { q: "Do you ___ a pen?", o: ["Has", "Have", "Having"], a: 1, ex: "Gunakan 'Have' untuk subjek 'You'." },
    { q: "Water ___ at 100 degrees.", o: ["Boil", "Boils", "Boiling"], a: 1, ex: "Fakta ilmiah menggunakan V+s." }
];

// --- DATA SOAL GAMES (10 SOAL TEBAK KATEGORI) ---
const gameQuestions = [
    { q: "Apple, Banana, Orange are...", o: ["Animals", "Fruits", "Jobs"], a: 1, ex: "Itu adalah nama-nama buah (Fruits)." },
    { q: "Lion, Tiger, Elephant are...", o: ["Animals", "Vehicles", "Foods"], a: 0, ex: "Jelas itu adalah hewan (Animals)." },
    { q: "Red, Blue, Yellow are...", o: ["Sizes", "Colors", "Names"], a: 1, ex: "Itu adalah macam-macam warna (Colors)." },
    { q: "Doctor, Teacher, Pilot are...", o: ["Hobbies", "Places", "Jobs"], a: 2, ex: "Itu adalah jenis pekerjaan (Jobs)." },
    { q: "Car, Bus, Plane are...", o: ["Vehicles", "Clothes", "Drinks"], a: 0, ex: "Itu adalah alat transportasi (Vehicles)." },
    { q: "Monday, Tuesday, Friday are...", o: ["Months", "Days", "Years"], a: 1, ex: "Itu adalah nama-nama hari (Days)." },
    { q: "Pizza, Burger, Soup are...", o: ["Drinks", "Foods", "Tools"], a: 1, ex: "Itu adalah jenis makanan (Foods)." },
    { q: "Table, Chair, Bed are...", o: ["Furniture", "Animals", "Fruits"], a: 0, ex: "Itu adalah perabotan rumah (Furniture)." },
    { q: "Eyes, Nose, Mouth are...", o: ["Body Parts", "Electronics", "Buildings"], a: 0, ex: "Itu adalah bagian tubuh (Body Parts)." },
    { q: "Circle, Square, Triangle are...", o: ["Colors", "Shapes", "Sizes"], a: 1, ex: "Itu adalah bentuk-bentuk (Shapes)." }
];

// --- DATA SOAL TOEIC (10 SOAL INCOMPLETE SENTENCES) ---
const toeicQuestions = [
    { q: "The marketing director decided to ___ the product launch until next quarter.", o: ["postpone", "postponed", "postponing"], a: 0, ex: "Setelah modal/infinitive 'to', gunakan kata kerja dasar (Verb 1)." },
    { q: "Ms. Tanaka received an award for her ___ contributions to the company.", o: ["exception", "exceptional", "exceptionally"], a: 1, ex: "Butuh kata sifat (adjective) 'exceptional' untuk menerangkan kata benda 'contributions'." },
    { q: "Please review the updated safety guidelines ___ before operating the machinery.", o: ["careful", "carefully", "carefulness"], a: 1, ex: "Butuh kata keterangan (adverb) 'carefully' untuk menerangkan kata kerja 'review'." },
    { q: "The new software system operates much more ___ than the old one.", o: ["efficient", "efficiently", "efficiency"], a: 1, ex: "Menerangkan cara kerja ('operates'), maka gunakan adverb 'efficiently'." },
    { q: "Mr. Gomez is the executive ___ is responsible for overseas expansion.", o: ["who", "which", "whose"], a: 0, ex: "Relative pronoun 'who' digunakan untuk menggantikan subjek orang (Mr. Gomez)." },
    { q: "All employees are required to attend the seminar ___ they have a scheduling conflict.", o: ["unless", "although", "despite"], a: 0, ex: "'Unless' berarti 'kecuali jika', cocok untuk kondisi pengecualian ini." },
    { q: "The renovation project was completed ___ schedule thanks to the team's hard work.", o: ["ahead of", "forward", "in front of"], a: 0, ex: "'Ahead of schedule' adalah idiom yang berarti 'lebih cepat dari jadwal'." },
    { q: "The company's profits have grown ___ since the restructuring last year.", o: ["significance", "significant", "significantly"], a: 2, ex: "Gunakan adverb 'significantly' untuk menerangkan peningkatan kata kerja 'have grown'." },
    { q: "He suggested ___ a temporary consultant to help with the heavy workload.", o: ["hire", "hiring", "to hire"], a: 1, ex: "Kata kerja 'suggest' diikuti oleh Gerund (Verb+ing), yaitu 'hiring'." },
    { q: "Free high-speed internet access is ___ to all guests staying at the hotel.", o: ["available", "availability", "availably"], a: 0, ex: "Butuh kata sifat (adjective) 'available' setelah to be 'is'." }
];


function goToMenu() {
    // 1. Ambil input nama dari user
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;

    // Validasi simpel (opsional, sesuaikan dengan logic biasamu)
    if (usernameInput === "" || passwordInput === "") {
        alert("Nama dan Password tidak boleh kosong!");
        return;
    }
    
    if (passwordInput !== "tugas123") {
        alert("Password salah, bro! Cek hint di bawah.");
        return;
    }

    // 2. Set nama user ke teks animasi dan pesan selamat datang di menu
    document.getElementById('anim-username').innerText = usernameInput;
    document.getElementById('welcome-msg').innerText = `Selamat Datang, ${usernameInput}!`;

    // 3. Sembunyikan Halaman Login
    document.getElementById('login-page').classList.add('hidden');

    // 4. Tampilkan Layar Animasi Selamat Datang
    const animPage = document.getElementById('welcome-animation-page');
    animPage.classList.remove('hidden');

    // 5. Set timer: Setelah 2.5 detik, jalankan fungsi transisi ke Menu
    setTimeout(() => {
        // Sembunyikan layar animasi
        animPage.classList.add('hidden');
        
        // Tampilkan Halaman Menu Utama
        document.getElementById('menu-page').classList.remove('hidden');
    }, 2500); // 2500 milidetik = 2.5 detik
}


function startApp(mode) {
    currentGameMode = mode;
    hp = 5; exp = 0; currentStep = 0;
    updateStats();
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    loadContent();
}

function loadContent() {
    // MODIFIKASI: Logika penentuan bank soal berdasarkan 3 mode
    let questions;
    if (currentGameMode === 'Quiz') {
        questions = quizQuestions;
    } else if (currentGameMode === 'Games') {
        questions = gameQuestions;
    } else if (currentGameMode === 'TOEIC') {
        questions = toeicQuestions;
    }
    
    if (currentStep >= questions.length || hp <= 0) {
        showResult();
        return;
    }

    const data = questions[currentStep];
    const total = questions.length;
    document.getElementById('question-text').innerText = `${currentGameMode} (${currentStep + 1}/${total}): ${data.q}`;
    document.getElementById('feedback-area').classList.add('hidden');
    
    const optionsDiv = document.getElementById('options-container');
    optionsDiv.innerHTML = '';
    
    data.o.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(index, data);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(index, data) {
    const feedbackArea = document.getElementById('feedback-area');
    const optionsButtons = document.querySelectorAll('.option-btn');
    optionsButtons.forEach(b => b.disabled = true);

    if(index === data.a) {
        exp += 50;
        document.getElementById('explanation-text').innerText = "✅ Benar! " + data.ex;
    } else {
        hp -= 1;
        document.getElementById('explanation-text').innerText = "❌ Salah! " + data.ex;
    }

    updateStats();
    feedbackArea.classList.remove('hidden');
}

function nextQuestion() {
    currentStep++;
    loadContent();
}

function updateStats() {
    document.getElementById('hp-val').innerText = hp;
    document.getElementById('exp-val').innerText = exp;
}

function showResult() {
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('result-page').classList.remove('hidden');
    let msg = (hp <= 0) ? "Game Over! Nyawa habis." : "Finish! Kamu hebat.";
    document.getElementById('final-stats').innerText = `${msg} Skor Akhir: ${exp} EXP`;
}
