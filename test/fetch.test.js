require('whatwg-fetch');

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

test("本のタイトルを取得する", () => {
    expect.assertions(1);
    return expect(bookTitle("4774169315")).resolves.toEqual("Javaエンジニア養成読本");
});

test("取れない場合", () => {
    expect.assertions(1);
    return expect(bookTitle("XXXXXXXXXX")).resolves.toEqual("XXXXXXXXXX ?");
});