function isISBN10(value) {
    if (value.startsWith("4")) {
        // とりあえず日本だけ対象
        return true;
    }
    return false;
}
function isISBN13(value) {
    // とりあえず日本だけ対象
    if (value.startsWith("9784")) {
        return true;
    }
    return false;
}

function collectIsbn(text) {
    const isbns = new Set();

    for (const candidate of text.match(/\d[\d-]{8,}[\dX]/g)) {
        const isbnNumberCandidate = candidate.replace(/-/g, "");
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

chrome.storage.local.get("isbns", result => {
    const isbnSet = new Set(result.isbns);
    collectIsbn(htmlText).forEach(isbn => {
        isbnSet.add(isbn);

        result.isbns = Array.from(isbnSet);
        chrome.storage.local.set(result);
    });
});
