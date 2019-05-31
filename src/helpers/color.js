import Color from "color";
import csscolors from "css-color-names";

const formatInput = value =>
  value
    .toString()
    .replace(/\n/g, " ")
    .replace(/\s\s+/g, " ")
    .trim();

const isValidColor = color => {
  let isValid;
  try {
    isValid = Color(color);
    return isValid;
  } catch (error) {
    console.log(color);
  }
  return isValid || csscolors[color];
};

const transformColorList = colors =>
  colors
    .replace(/\s+/g, "")
    .split(";")
    .reduce((colors, item) => {
      if (item !== "" && isValidColor(item)) {
        const color = Color(item);

        const round = (value, precision) =>
          Number(Math.round(value + "e" + precision) + "e-" + precision);

        const formatNumbericValues = (hsl, precision) =>
          hsl.color.map(value => round(value, precision));

        const hslFormatted = (hsl, precision) => {
          const niceNumbers = formatNumbericValues(hsl, precision);
          return `hsl(${niceNumbers[0]}%, ${niceNumbers[1]}%, ${
            niceNumbers[2]
          }%)`;
        };

        return [
          ...colors,
          {
            original: item,
            hex: color.hex(),
            rgb: color.rgb().string(),
            hsl: hslFormatted(color.hsl(), 1),
            sortProps: {
              color: color.rgbNumber(),
              luminosity: color.luminosity()
            },
            isDark: color.isDark()
          }
        ];
      } else {
        return colors;
      }
    }, []);

export { formatInput, isValidColor, transformColorList };
