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

function showList() {
    const books = document.getElementById("books");
    [...books.children].forEach(child => child.remove());

    chrome.storage.local.get("isbns", result => {
        result.isbns.forEach(isbn => {
            const lineColumns = document.createElement("div");
            lineColumns.className = "columns is-mobile is-gapless";
            books.appendChild(lineColumns);

            const isbnColumn = document.createElement("div");
            isbnColumn.className = "column";
            isbnColumn.title=isbn;
            bookTitle(isbn).then(title => {
                isbnColumn.appendChild(document.createTextNode(title));
            });

            const buttonColumn = document.createElement("div");
            buttonColumn.className = "column is-3";
            const remove = document.createElement("button");
            remove.className = "button is-small fas fa-times";
            remove.onclick = () => {
                lineColumns.remove();
            };
            buttonColumn.appendChild(remove);

            const link = document.createElement("button");
            link.className = "button is-small is-warning fab fa-amazon";
            link.onclick = () => {
                window.open("https://www.amazon.co.jp/gp/search?field-isbn=" + isbn, "_blank");
            };
            buttonColumn.appendChild(link);

            lineColumns.appendChild(isbnColumn);
            lineColumns.appendChild(buttonColumn);
        });
    });
};

document.getElementById("initialize").onclick = () => {
    chrome.storage.local.remove("isbns");
    const books = document.getElementById("books");
    [...books.children].forEach(child => child.remove());
};

document.addEventListener("DOMContentLoaded", () => {
    //document.body.style.width = "200px";
});

showList();