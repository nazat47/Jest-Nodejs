import { getStringInfo, StringUtils, toUpperCase } from "../app/utils";

describe("utils test suite", () => {
  describe("string utils tests", () => {
    let sut: StringUtils;
    beforeEach(() => {
      sut = new StringUtils();
    });

    it("should return correct uppercase", () => {
      const actual = sut.toUpperCase("abc");

      expect(actual).toBe("ABC");
    });

    it("should throw error on invalid argument", () => {
      function expectError() {
        const actual = sut.toUpperCase("");
      }

      expect(expectError).toThrow();
    });

    it("should throw error on invalid argument - arrow Fn", () => {
      expect(() => sut.toUpperCase("")).toThrow();
    });

    it("should throw error on invalid argument - try catch", (done) => {
      try {
        sut.toUpperCase("");
        done("GetStringInfo should throw error for invalid arg");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message");
        done();
      }
    });
  });

  it("should return uppercase", () => {
    const sut = toUpperCase;
    const expected = "NAZAT";

    const actual = sut("nazat");

    expect(actual).toBe(expected);
  });

  describe("toUpperCase examples", () => {
    it.each([
      { input: "naz", expected: "NAZ" },
      { input: "raima", expected: "RAIMA" },
    ])("$input to uppercase should be $expected", ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe("get string info for arg My-String should", () => {
    it("return right length", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toHaveLength(9);
    });
    it("return right lower case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.lowerCase).toBe("my-string");
    });
    it("return right characters", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toContain("S");
      expect(actual.characters).toEqual(expect.arrayContaining(["M", "y"]));
    });
    it("return defined extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toEqual({});

      expect(actual.extraInfo).not.toBeUndefined();
    });
  });
});
