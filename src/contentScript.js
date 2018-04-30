function collectIsbn(text) {
    const isbns = text.match(/\d{10,}/g)
        .filter(candidate => candidate.length == 10 || candidate.length == 13);
    return isbns;
}

const htmlText = document.documentElement.innerHTML;

chrome.storage.local.get("isbns", result => {
    const isbnSet = new Set(result.isbns)
    collectIsbn(htmlText).forEach(isbn => {
        isbnSet.add(isbn);

        result.isbns = Array.from(isbnSet);
        chrome.storage.local.set(result);
    });
});
