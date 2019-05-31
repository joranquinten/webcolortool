import {
  formatInput,
  isValidColor,
  transformColorList
} from "../../../src/helpers/color";

describe("helpers/color", () => {
  it("should export the correct methods", () => {
    expect(typeof formatInput).toEqual("function");
    expect(typeof isValidColor).toEqual("function");
    expect(typeof transformColorList).toEqual("function");
  });

  describe("formatInput", () => {
    it("should always return a string", () => {
      expect(formatInput("")).toEqual("");
      expect(formatInput(2)).toEqual("2");
    });

    it("should replace instances new lines with a single space and trim", () => {
      expect(
        formatInput(`
`)
      ).toEqual("");
    });
    expect(
      formatInput(`
some


content`)
    ).toEqual("some content");
  });

  describe("isValidColor", () => {
    it("should return true on hex colors", () => {
      expect(isValidColor("#fff")).toBeTruthy();
      expect(isValidColor("#c1c2c3")).toBeTruthy();
      expect(isValidColor("#CCC000")).toBeTruthy();

      expect(isValidColor("#ffffffff")).toBeFalsy();
    });
  });

  describe("tranformColorList", () => {
    it("should convert a string to an array", () => {
      expect(transformColorList("")).toEqual([]);
    });

    it('should strip spaces and split the list based on ";" symbol', () => {
      expect(transformColorList(" ; ")).toEqual([]);
    });

    it("should only process valid color", () => {
      const output = transformColorList("some invalid thing;#fff");
      expect(output).toHaveLength(1);
      expect(output[0]).toEqual({
        original: "#fff",
        hex: "#FFFFFF",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0%, 0%, 100%)",
        sortProps: { color: 16777215, luminosity: 1 },
        isDark: false
      });
    });
  });
});
