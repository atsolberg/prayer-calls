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

export const months = [
  { name: "January", abbr: "Jan", value: 1 },
  { name: "February", abbr: "Feb", value: 2 },
  { name: "March", abbr: "Mar", value: 3 },
  { name: "April", abbr: "Apr", value: 4 },
  { name: "May", abbr: "May", value: 5 },
  { name: "June", abbr: "Jun", value: 6 },
  { name: "July", abbr: "Jul", value: 7 },
  { name: "August", abbr: "Aug", value: 8 },
  { name: "September", abbr: "Sept", value: 9 },
  { name: "October", abbr: "Oct", value: 10 },
  { name: "November", abbr: "Nov", value: 11 },
  { name: "December", abbr: "Dec", value: 12 },
];
