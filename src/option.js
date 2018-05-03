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

function showIgnores() {
    const ignores = document.getElementById("ignores");
    chrome.storage.local.get("ignores", result => {
        result.ignores.forEach(ignoreIsbn => {
            // ISBN
            const isbnColumn = document.createElement("td");
            isbnColumn.appendChild(document.createTextNode(ignoreIsbn));

            // 書名取得ボタン
            const loadColumn = document.createElement("td");
            const loadTitleButton = document.createElement("button");
            loadTitleButton.className = "button  is-small fas fa-book";
            loadTitleButton.onclick = () => {
                bookTitle(ignoreIsbn).then(title => {
                    loadTitleButton.remove();
                    loadColumn.appendChild(document.createTextNode(title));
                });
            }
            loadColumn.appendChild(loadTitleButton);

            const row = document.createElement("tr");
            row.appendChild(isbnColumn);
            row.appendChild(loadColumn);
            ignores.appendChild(row);
        });
    });
}

function clearIgnores() {
    chrome.storage.local.remove("ignores");

    const ignores = document.getElementById("ignores");
    [...ignores.children].forEach(child => child.remove());
}

document.addEventListener("DOMContentLoaded", showIgnores);
document.getElementById("clearIgnores").onclick = clearIgnores;