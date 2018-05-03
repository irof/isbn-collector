function isISBN10(value) {
    // 日本だけ対象
    if (value.startsWith("4")) {
        // checkdigitが合うやつだけ
        return checkdigit10(value);
    }
    return false;
}
function checkdigit10(value) {
    let temp = 0;
    for (let index = 0; index < 9; index++) {
        const v = value[index];
        temp += Number(v) * (10 - index);
    }
    const expected = 11 - (temp % 11);

    const actual = value[9];
    if (expected == 10) return actual === "X";
    return actual === String(expected);
}

function isISBN13(value) {
    // とりあえず日本だけ対象
    if (value.startsWith("9784")) {
        return true;
    }
    return false;
}

function collectIsbn(text, ignoreIsbns) {
    const isbns = new Set();

    for (const candidate of text.match(/\d[\d-]{8,}[\dX]/g)) {
        const isbnNumberCandidate = candidate.replace(/-/g, "");
        if (ignoreIsbns && ignoreIsbns.includes(isbnNumberCandidate)) continue;

        if (isbnNumberCandidate.length == 10) {
            if (isISBN10(isbnNumberCandidate)) isbns.add(isbnNumberCandidate);
        }
        if (isbnNumberCandidate.length == 13) {
            if (isISBN13(isbnNumberCandidate)) isbns.add(isbnNumberCandidate);
        }
    }
    return Array.from(isbns);
}

const htmlText = document.documentElement.innerHTML;

chrome.storage.local.get(["isbns", "ignores"], result => {
    const isbnSet = new Set(result.isbns);
    collectIsbn(htmlText, result.ignores).forEach(isbn => {
        isbnSet.add(isbn);

        result.isbns = Array.from(isbnSet);
        chrome.storage.local.set(result);
    });
});
