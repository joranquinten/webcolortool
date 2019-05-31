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
      expect(isValidColor("white")).toBeTruthy();
      expect(isValidColor("rebeccapurple")).toBeTruthy();
      expect(isValidColor("#ffffffff")).toBeTruthy();

      expect(isValidColor("#ffffffff00")).toBeFalsy();
      expect(isValidColor("nonexistentcolor")).toBeFalsy();
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
      const output = transformColorList(
        "some invalid thing;#fff; rebeccapurple; rgb(0, 0, 0);  rgb(125, 75, 200, 50);"
      );
      expect(output.length).toEqual(4);
      expect(output[0]).toEqual({
        original: "#fff",
        hex: "#FFFFFF",
        rgb: "rgb(255, 255, 255)",
        hsl: "hsl(0%, 0%, 100%)",
        sortProps: { color: 16777215, luminosity: 1 },
        isDark: false
      });
      expect(output[1]).toEqual({
        hex: "#663399",
        hsl: "hsl(270%, 50%, 40%)",
        isDark: true,
        original: "rebeccapurple",
        rgb: "rgb(102, 51, 153)",
        sortProps: { color: 6697881, luminosity: 0.07492341159447033 }
      });
      expect(output[2]).toEqual({
        hex: "#000000",
        hsl: "hsl(0%, 0%, 0%)",
        isDark: true,
        original: "rgb(0,0,0)",
        rgb: "rgb(0, 0, 0)",
        sortProps: { color: 0, luminosity: 0 }
      });
      expect(output[3]).toEqual({
        hex: "#7D4BC8",
        hsl: "hsl(264%, 53.2%, 53.9%)",
        isDark: true,
        original: "rgb(125,75,200,50)",
        rgb: "rgb(125, 75, 200)",
        sortProps: { color: 8211400, luminosity: 0.13562258759780754 }
      });
    });
  });
});
