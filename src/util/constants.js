// Used in console logging
export const css = {
  fwb: "font-weight: bold;",
  fwn: "font-weight: normal;",

  black: "color: #777777;",
  gray: "color: #9e9e9e;",
  white: "color: #ffffff",
  blue: "color: #03a9f4;",
  green: "color: #4caf50;",
  red: "color: #f20404;",
  orange: "color: #ff8000;",
};

// Used in console logging
export const styles = {
  normal: `${css.fwn}${css.black}`,
  strong: `${css.fwb}${css.black}`,
  label: `${css.fwb}${css.gray}`,
  value: `${css.fwn}${css.blue}`,
  success: `${css.fwn}${css.green}`,
  error: `${css.fwn}${css.red}`,
  orange: `${css.fwn}${css.orange}`,
};
