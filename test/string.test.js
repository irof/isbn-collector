function collectISBN(text) {
    // とりあえず - は考えないことにする
    const candidates = text.match(/\d{10,}/g);
    return candidates.filter(candidate => candidate.length == 10 || candidate.length == 13);
}

test("match", () => {
    const text = "abc123456789def,abc1234567890def,abc12345678901def"
        + ",abc123456789012def,abc1234567890123def,abc12345678901234def";

    const actual = collectISBN(text);

    expect(actual).toEqual([
        "1234567890",
        "1234567890123"
    ]);
});