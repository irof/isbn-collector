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

test("ISBNとして正しいやつ", () => {
    expect(checkdigit10("4774169315")).toBeTruthy();
});
test("ISBNとして正しいやつ_X", () => {
    expect(checkdigit10("477418411X")).toBeTruthy();
});
test("ISBNとして正しくないやつ", () => {
    expect(checkdigit10("477416931X")).toBeFalsy();
});