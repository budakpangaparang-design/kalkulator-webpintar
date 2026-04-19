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
        display.value = eval(display.value);
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
    // TOKEN
    // =====================
    let tokens = input.split(" ").filter(t => t !== "");

    let hasil = null;
    let operasi = null;

    // fungsi operator (STRICT)
    function getOp(word) {
        if (word === "tambah" || word === "ditambah" || word === "beli") return "+";
        if (word === "kurang" || word === "dikurang" || word === "dimakan") return "-";
        if (word === "kali" || word === "dikali") return "*";
        if (word === "bagi" || word === "dibagi") return "/";
        return null;
    }

    // =====================
    // PARSING (AMAN)
    // =====================
    for (let i = 0; i < tokens.length; i++) {
        let word = tokens[i];

        // angka
        if (!isNaN(word)) {
            let num = parseFloat(word);

            if (hasil === null) {
                hasil = num;
            } else if (operasi !== null) {
                if (operasi === "+") hasil += num;
                else if (operasi === "-") hasil -= num;
                else if (operasi === "*") hasil *= num;
                else if (operasi === "/") hasil /= num;

                operasi = null; // reset
            }
        }

        // operator
        let op = getOp(word);
        if (op !== null) {
            operasi = op;
        }
    }

    // =====================
    // DETEKSI OBJEK
    // =====================
    let benda = "";
    for (let word of tokens) {
        if (isNaN(word) && !getOp(word) && word.length > 2) {
            benda = word;
        }
    }

    // =====================
    // OUTPUT
    // =====================
    if (hasil !== null) {
        output.innerText = benda ? hasil + " " + benda : hasil;
    } else {
        output.innerText = "Tidak mengerti";
    }
}