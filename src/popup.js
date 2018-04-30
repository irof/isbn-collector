document.getElementById("reload").onclick = () => {
    const books = document.getElementById("books");

    const ul = document.createElement("ul");
    books.appendChild(ul);

    chrome.storage.local.get("isbns", result => {
        result.isbns.forEach(isbn => {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(isbn));

            const link = document.createElement("a");
            link.href = "https://www.amazon.co.jp/gp/search?field-isbn=" + isbn;
            link.target = "_blank";
            link.appendChild(document.createTextNode("Amazonで開いてみる"));
            li.appendChild(link);

            ul.appendChild(li);
        });
    });
}