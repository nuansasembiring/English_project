// --- STATE GLOBAL UTAMA ---
let hp = 5;
let exp = 0;
let score = 0;
let currentStep = 0;
let currentGameMode = "";
let currentUsername = "User"; 

// --- DATA BANK SOAL ---
const quizQuestions = [
    { q: "She ___ to school every day.", o: ["Go", "Goes", "Going"], a: 1, ex: "Subjek 'She' menggunakan Verb+s/es." },
    { q: "I ___ not like coffee.", o: ["Do", "Does", "Am"], a: 0, ex: "Subjek 'I' menggunakan 'Do'." },
    { q: "___ they play football?", o: ["Does", "Is", "Do"], a: 2, ex: "Subjek 'They' menggunakan 'Do' untuk tanya." },
    { q: "The sun ___ in the east.", o: ["Rise", "Rises", "Rising"], a: 1, ex: "Fakta alam menggunakan V+s." },
    { q: "We ___ students.", o: ["Are", "Is", "Am"], a: 0, ex: "Subjek 'We' menggunakan 'Are'." },
    { q: "Cats ___ fish.", o: ["Like", "Likes", "Liking"], a: 0, ex: "Subjek jamak (Cats) menggunakan V1 dasar." },
    { q: "He ___ a book every night.", o: ["Read", "Reads", "Reading"], a: 1, ex: "Subjek 'He' menggunakan V+s." },
    { q: "You ___ happy today.", o: ["Am", "Is", "Look"], a: 2, ex: "'Look' adalah kata kerja sensori yang tepat." },
    { q: "Does she ___ English?", o: ["Speak", "Speaks", "Speaking"], a: 0, ex: "Setelah 'Does' kembali ke Verb dasar." },
    { q: "It ___ often rain in winter.", o: ["Do", "Does", "Is"], a: 1, ex: "Subjek 'It' menggunakan 'Does'." },
    { q: "I always ___ up at 5 AM.", o: ["Wake", "Wakes", "Woke"], a: 0, ex: "Subjek 'I' menggunakan V1." },
    { q: "They ___ not work on Sundays.", o: ["Do", "Does", "Are"], a: 0, ex: "Subjek 'They' menggunakan 'Do'." },
    { q: "My father ___ a doctor.", o: ["Am", "Is", "Are"], a: 1, ex: "Subjek tunggal menggunakan 'Is'." },
    { q: "Do you ___ a pen?", o: ["Has", "Have", "Having"], a: 1, ex: "Subjek 'You' menggunakan 'Have'." },
    { q: "Water ___ at 100 degrees.", o: ["Boil", "Boils", "Boiling"], a: 1, ex: "Fakta ilmiah menggunakan V+s." }
];

const toeicQuestions = [
    { q: "The manager ___ the meeting yesterday.", o: ["Cancel", "Cancelled", "Cancelling"], a: 1, ex: "Ada keterangan 'Yesterday' (lampau), gunakan V2." },
    { q: "Please ___ the document carefully.", o: ["Review", "Reviews", "Reviewed"], a: 0, ex: "Kalimat perintah (Imperative) menggunakan V dasar." },
    { q: "The new policy will be ___ next month.", o: ["Implement", "Implemented", "Implementing"], a: 1, ex: "Passive voice (be + V3)." },
    { q: "We look forward to ___ with you.", o: ["Work", "Works", "Working"], a: 2, ex: "Frasa 'look forward to' diikuti Gerund (V-ing)." },
    { q: "She is the ___ employee in this office.", o: ["Efficient", "More efficient", "Most efficient"], a: 2, ex: "Superlative (paling) untuk membandingkan semua." },
    { q: "Mr. Tan is ___ for the marketing budget.", o: ["Responsible", "Responsibility", "Responsibly"], a: 0, ex: "Dibutuhkan Adjective setelah To-be." },
    { q: "The shipment was delivered ___ than expected.", o: ["Soon", "Sooner", "Soonest"], a: 1, ex: "Comparative (lebih) ditandai kata 'Than'." },
    { q: "He has been working here ___ ten years.", o: ["Since", "For", "During"], a: 1, ex: "'For' digunakan untuk durasi waktu." },
    { q: "If it rains, we ___ the event.", o: ["Postpone", "Will postpone", "Postponed"], a: 1, ex: "Conditional Sentence type 1 (Will + V1)." },
    { q: "Could you please ___ me the report?", o: ["Send", "Sends", "Sent"], a: 0, ex: "Setelah modal 'Could' gunakan V dasar." },
    { q: "The seminar was ___ by fifty people.", o: ["Attend", "Attended", "Attending"], a: 1, ex: "Passive voice (was + V3)." },
    { q: "You must sign the contract ___.", o: ["Immediate", "Immediacy", "Immediately"], a: 2, ex: "Dibutuhkan Adverb untuk menjelaskan cara sign." },
    { q: "Is there ___ coffee left?", o: ["Many", "Any", "Few"], a: 1, ex: "Kalimat tanya/negatif untuk benda tak terhitung gunakan 'Any'." },
    { q: "The printer is ___ of order.", o: ["Out", "In", "Off"], a: 0, ex: "'Out of order' berarti rusak." },
    { q: "She speaks English very ___.", o: ["Good", "Well", "Best"], a: 1, ex: "Adverb dari Good adalah Well." }
];

const gameQuestions = [
    { q: "Apple, Banana, Orange are...", o: ["Animals", "Fruits", "Jobs"], a: 1, ex: "Ini adalah nama buah." },
    { q: "Car, Bus, Plane are...", o: ["Vehicles", "Clothes", "Drinks"], a: 0, ex: "Ini adalah transportasi." },
    { q: "Red, Blue, Yellow are...", o: ["Names", "Shapes", "Colors"], a: 2, ex: "Ini adalah kategori warna." },
    { q: "Doctor, Teacher, Nurse are...", o: ["Hobbies", "Jobs", "Sports"], a: 1, ex: "Ini adalah profesi/pekerjaan." },
    { q: "Monday, Friday, Sunday are...", o: ["Months", "Days", "Years"], a: 1, ex: "Ini adalah nama hari." },
    { q: "Lion, Tiger, Bear are...", o: ["Birds", "Insects", "Animals"], a: 2, ex: "Ini adalah kategori hewan." },
    { q: "Milk, Water, Juice are...", o: ["Foods", "Drinks", "Tools"], a: 1, ex: "Ini adalah kategori minuman." },
    { q: "Table, Chair, Sofa are...", o: ["Electronics", "Furniture", "Foods"], a: 1, ex: "Ini adalah perabotan rumah." },
    { q: "Mother, Father, Sister are...", o: ["Family", "Friends", "Jobs"], a: 0, ex: "Ini adalah anggota keluarga." },
    { q: "Circle, Square, Triangle are...", o: ["Colors", "Sizes", "Shapes"], a: 2, ex: "Ini adalah kategori bentuk." },
    { q: "Bed, Pillow, Blanket are in the...", o: ["Kitchen", "Bedroom", "Garden"], a: 1, ex: "Barang ini ada di kamar tidur." },
    { q: "Hat, Shirt, Pants are...", o: ["Clothes", "Foods", "Plants"], a: 0, ex: "Ini adalah pakaian." },
    { q: "English, Math, Science are...", o: ["Hobby", "Subjects", "Games"], a: 1, ex: "Ini adalah mata pelajaran." },
    { q: "Pen, Pencil, Eraser are...", o: ["Stationery", "Kitchenware", "Toys"], a: 0, ex: "Ini adalah alat tulis." },
    { q: "Sun, Moon, Stars are in the...", o: ["Sea", "Sky", "Ground"], a: 1, ex: "Benda langit ada di angkasa." }
];

// --- FUNGSI LOGIN ---
function goToMenu() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const sidebar = document.querySelector('.sidebar');

    if (passwordInput === "tugas123") {
        if (usernameInput.trim() === "") {
            alert("Masukkan nama kamu dulu ya!");
            return;
        }

        // Set nama user global
        currentUsername = usernameInput.trim();

        // Singkronisasi info user ke UI
        document.getElementById('anim-username').innerText = currentUsername;
        document.getElementById('side-username').innerText = currentUsername;
        document.getElementById('side-avatar').innerText = currentUsername.charAt(0).toUpperCase();

        // Hilangkan halaman Login
        document.getElementById('login-page').classList.add('hidden');

        // Nyalakan Sidebar & Animasi transisi masuk
        sidebar.classList.add('active'); 
        document.getElementById('welcome-animation-page').classList.remove('hidden');

        // Muat tabel skor global agar langsung siap dilihat
        displayLeaderboard();

        // Jeda waktu 3 detik agar animasi loading terasa dramatis
        setTimeout(() => {
            document.getElementById('welcome-animation-page').classList.add('hidden');
            document.getElementById('menu-page').classList.remove('hidden');
        }, 3000);

    } else {
        alert("Password salah! Hint: tugas123");
    }
}

// --- FUNGSI PILIHAN GAME ---
function startApp(mode) {
    currentGameMode = mode;
    hp = 5; 
    exp = 0; 
    score = 0; 
    currentStep = 0;
    
    updateStats(); 
    
    document.getElementById('menu-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    loadContent();
}

function exitToMenu() {
    if (confirm("Yakin mau keluar ke menu utama? Progres kamu akan hilang, bro.")) {
        document.getElementById('game-page').classList.add('hidden');
        document.getElementById('result-page').classList.add('hidden');
        document.getElementById('menu-page').classList.remove('hidden');
        
        currentStep = 0;
        hp = 5;
        exp = 0;
        score = 0;
        
        updateStats();
        window.scrollTo(0, 0);
    }
}

// --- GAME LOGIC ENGINE ---
function loadContent() {
    let questions;
    if (currentGameMode === 'Quiz') questions = quizQuestions;
    else if (currentGameMode === 'TOEIC') questions = toeicQuestions;
    else questions = gameQuestions;

    // Proteksi jika soal habis atau nyawa menyentuh angka 0
    if (currentStep >= questions.length || hp <= 0) {
        showResult();
        return;
    }

    const data = questions[currentStep];
    document.getElementById('question-text').innerText = `${currentGameMode} (${currentStep + 1}/${questions.length}): ${data.q}`;
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
    
    // Kunci tombol agar tidak bisa diklik berulang kali
    optionsButtons.forEach(b => b.disabled = true);

    if (index === data.a) {
        exp += 50;
        score += 10; 
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

// --- UPDATE TAMPILAN STATS REAL-TIME ---
function updateStats() {
    document.getElementById('hp-val').innerText = hp;
    document.getElementById('exp-val').innerText = exp;
    document.getElementById('side-exp').innerText = exp; // Berhasil singkron ke sidebar
    
    const scoreVal = document.getElementById('score-val');
    if (scoreVal) {
        scoreVal.innerText = score;
    }
}

// --- SISTEM LOCALSTORAGE LEADERBOARD ---
function saveScore(username, finalScore) {
    let leaderboard = JSON.parse(localStorage.getItem('english_leaderboard')) || [];
    
    leaderboard.push({ name: username, score: finalScore, date: new Date().toLocaleDateString() });
    leaderboard.sort((a, b) => b.score - a.score);
    
    // Simpan maksimal 10 data teratas
    leaderboard = leaderboard.slice(0, 10);
    
    localStorage.setItem('english_leaderboard', JSON.stringify(leaderboard));
}

function displayLeaderboard() {
    const listContainer = document.getElementById('leaderboard-list');
    if (!listContainer) return; 
    
    let leaderboard = JSON.parse(localStorage.getItem('english_leaderboard')) || [];
    listContainer.innerHTML = ""; 

    if (leaderboard.length === 0) {
        listContainer.innerHTML = `<tr><td colspan="3" style="text-align:center;">Belum ada rekor.</td></tr>`;
        return;
    }

    // Ambil Top 5 untuk ditampilkan di Widget Sidebar Menu
    leaderboard.slice(0, 5).forEach((data, index) => {
        const row = document.createElement('tr');
        if (index === 0) row.style.color = "#f1c40f"; // Efek khusus Rank 1 emas

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.score}</td>
        `;
        listContainer.appendChild(row);
    });
}

// --- SCREEN AKHIR (RESULTS) & LOGOUT ---
function showResult() {
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('result-page').classList.remove('hidden');
    
    saveScore(currentUsername, score);

    let pesan = hp <= 0 ? "Yah, nyawa kamu habis! 💀" : "Luar biasa! Sesi selesai! 🏆";
    let warnaSkor = hp <= 0 ? "#ff7675" : "#55efc4";

    const statsContainer = document.getElementById('final-stats');
    statsContainer.innerHTML = `
        <p style="font-weight: bold; color: ${warnaSkor}; font-size:1.2rem;">${pesan}</p>
        <div style="background: #222; padding: 15px; border-radius: 12px; border: 1px solid #444; margin-top:10px;">
            <p style="margin: 5px 0;">⭐ Poin Terkumpul: <b>${score}</b></p>
            <p style="margin: 5px 0;">✨ Total EXP: <b>${exp}</b></p>
        </div>
    `;

    displayLeaderboard();
}

function backToMenuFromResults() {
    document.getElementById('result-page').classList.add('hidden');
    document.getElementById('menu-page').classList.remove('hidden');
    
    hp = 5;
    exp = 0;
    score = 0;
    currentStep = 0;
    
    updateStats();
}

function logout() {
    document.querySelector('.sidebar').classList.remove('active');
    location.reload();
}
