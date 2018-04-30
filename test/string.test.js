function collectIsbn(text) {
    const isbns = new Set();

    for (const candidate of text.match(/\d[\d-]{8,}[\dX]/g)) {
        const isbnNumberCandidate = candidate.replace(/-/g, "");
        if (isbnNumberCandidate.length == 10) {
            isbns.add(isbnNumberCandidate);
        }
        if (isbnNumberCandidate.length == 13) {
            isbns.add(isbnNumberCandidate);
        }
    }
    return Array.from(isbns);
}

test("match", () => {
    const text = ""
        + "abc123456789def,abc1234567890def,abc12345678901def"
        + ",abc123456789012def,abc1234567890123def,abc12345678901234def"
        + ",abc923-456-789-0def"
        + ",abc923-456-789-0-12-3def,"
        ;

    const actual = collectIsbn(text);

    expect(actual).toEqual([
        "1234567890",
        "1234567890123",
        "9234567890",
        "9234567890123"
    ]);
});