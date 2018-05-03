function bookTitle(isbn) {
    return fetch("https://api.openbd.jp/v1/get?isbn=" + isbn)
        .then(response => response.json())
        .then(result => {
            if (result.length === 1 && result[0]) {
                return result[0].summary.title;
            }
            return isbn + " ?";
        });
}

function removeIsbnFromStorage(isbn) {
    chrome.storage.local.get("isbns", result => {
        const filtered = result.isbns.filter(entry => entry !== isbn);
        result.isbns = filtered;
        chrome.storage.local.set(result);

        chrome.storage.local.get("ignores", ignoresResult => {
            if (!ignoresResult.ignores) ignoresResult.ignores = [];
            ignoresResult.ignores.push(isbn);
            chrome.storage.local.set(ignoresResult);
        });
    });
}

function showList() {
    const books = document.getElementById("books");
    [...books.children].forEach(child => child.remove());

    chrome.storage.local.get("isbns", result => {
        result.isbns.forEach(isbn => {
            const line = document.createElement("tr");
            books.appendChild(line);

            const isbnColumn = document.createElement("td");
            isbnColumn.title = isbn;
            bookTitle(isbn).then(title => {
                isbnColumn.appendChild(document.createTextNode(title));
            });

            const buttonColumn = document.createElement("td");
            const remove = document.createElement("button");
            remove.className = "button is-small fas fa-times";
            remove.onclick = () => {
                line.remove();
                removeIsbnFromStorage(isbn);
            };
            buttonColumn.style = "white-space: nowrap";
            buttonColumn.appendChild(remove);

            const link = document.createElement("button");
            link.className = "button is-small is-warning fab fa-amazon";
            link.onclick = () => {
                window.open("https://www.amazon.co.jp/gp/search?field-isbn=" + isbn, "_blank");
            };
            buttonColumn.appendChild(link);

            line.appendChild(isbnColumn);
            line.appendChild(buttonColumn);
        });
    });
}

document.getElementById("initialize").onclick = () => {
    chrome.storage.local.remove("isbns");
    const books = document.getElementById("books");
    [...books.children].forEach(child => child.remove());
};
document.getElementById("option").onclick = () => {
    window.location.href = './option.html';
}

document.addEventListener("DOMContentLoaded", () => {
    //document.body.style.width = "200px";
});

showList();