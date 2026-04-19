let display = document.getElementById("display");

// =====================
// KALKULATOR
// =====================
function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function toggleSign() {
    if (display.value) {
        display.value = display.value.startsWith("-")
            ? display.value.slice(1)
            : "-" + display.value;
    }
}

function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);

        display.value = result;

        // simpan ke history
        let historyList = document.getElementById("historyList");
        let li = document.createElement("li");
        li.innerText = expression + " = " + result;
        historyList.prepend(li);

    } catch {
        display.value = "Error";
    }
}

// =====================
// KEYBOARD SUPPORT
// =====================
document.addEventListener("keydown", function(e) {
    if (!isNaN(e.key)) append(e.key);
    if ("+-*/.".includes(e.key)) append(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearDisplay();
});

// =====================
// NLP FINAL (FIX TOTAL)
// =====================
function processNLP() {
    let input = document.getElementById("nlpInput").value.toLowerCase();
    let output = document.getElementById("nlpResult");

    // jawab nama
    if (input.includes("siapa namamu")) {
        output.innerText = "Nama saya kalkulator web pintar";
        return;
    }

    // =====================
    // KONVERSI ANGKA
    // =====================
    const angka = {
        "nol":0,"satu":1,"dua":2,"tiga":3,"empat":4,
        "lima":5,"enam":6,"tujuh":7,"delapan":8,
        "sembilan":9,"sepuluh":10
    };

    for (let k in angka) {
        input = input.replace(new RegExp(k, "g"), angka[k]);
    }

    // =====================
    // KONVERSI OPERATOR
    // =====================
    input = input
        .replace(/tambah|plus|beli|dapat/g, "+")
        .replace(/kurang|minus|hilang|dimakan/g, "-")
        .replace(/kali|dikali|x/g, "*")
        .replace(/bagi|dibagi/g, "/");

    // =====================
    // AMBIL HANYA ANGKA & OPERATOR
    // =====================
    let ekspresi = input.replace(/[^0-9+\-*/.]/g, "");

    try {
        let hasil = eval(ekspresi);
        output.innerText = hasil;
    } catch {
        output.innerText = "Tidak mengerti";
    }
}

function clearHistory() {
    document.getElementById("historyList").innerHTML = "";
}

function startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Browser tidak mendukung voice input");
        return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.lang = "id-ID"; // Bahasa Indonesia
    recognition.start();

    recognition.onresult = function(event) {
        let hasil = event.results[0][0].transcript;

        // tampilkan ke input
        document.getElementById("nlpInput").value = hasil;
    };

    recognition.onerror = function() {
        alert("Gagal mendeteksi suara");
    };
}