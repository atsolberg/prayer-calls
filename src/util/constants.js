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

export const books = [
  { id: "GEN", name: "Genesis" },
  { id: "EXO", name: "Exodus" },
  { id: "LEV", name: "Leviticus" },
  { id: "NUM", name: "Numbers" },
  { id: "DEU", name: "Deuteronomy" },
  { id: "JOS", name: "Joshua" },
  { id: "JDG", name: "Judges" },
  { id: "RUT", name: "Ruth" },
  { id: "1SA", name: "1 Samuel" },
  { id: "2SA", name: "2 Samuel" },
  { id: "1KI", name: "1 Kings" },
  { id: "2KI", name: "2 Kings" },
  { id: "1CH", name: "1 Chronicles" },
  { id: "2CH", name: "2 Chronicles" },
  { id: "EZR", name: "Ezra" },
  { id: "NEH", name: "Nehemiah" },
  { id: "EST", name: "Esther" },
  { id: "JOB", name: "Job" },
  { id: "PSA", name: "Psalms" },
  { id: "PRO", name: "Proverbs" },
  { id: "ECC", name: "Ecclesiastes" },
  { id: "SNG", name: "Song of Solomon" },
  { id: "ISA", name: "Isaiah" },
  { id: "JER", name: "Jeremiah" },
  { id: "LAM", name: "Lamentations" },
  { id: "EZK", name: "Ezekiel" },
  { id: "DAN", name: "Daniel" },
  { id: "HOS", name: "Hosea" },
  { id: "JOL", name: "Joel" },
  { id: "AMO", name: "Amos" },
  { id: "OBA", name: "Obadiah" },
  { id: "JON", name: "Jonah" },
  { id: "MIC", name: "Micah" },
  { id: "NAM", name: "Nahum" },
  { id: "HAB", name: "Habakkuk" },
  { id: "ZEP", name: "Zephaniah" },
  { id: "HAG", name: "Haggai" },
  { id: "ZEC", name: "Zechariah" },
  { id: "MAL", name: "Malachi" },
  { id: "MAT", name: "Matthew" },
  { id: "MRK", name: "Mark" },
  { id: "LUK", name: "Luke" },
  { id: "JHN", name: "John" },
  { id: "ACT", name: "Acts" },
  { id: "ROM", name: "Romans" },
  { id: "1CO", name: "1 Corinthians" },
  { id: "2CO", name: "2 Corinthians" },
  { id: "GAL", name: "Galatians" },
  { id: "EPH", name: "Ephesians" },
  { id: "PHP", name: "Philippians" },
  { id: "COL", name: "Colossians" },
  { id: "1TH", name: "1 Thessalonians" },
  { id: "2TH", name: "2 Thessalonians" },
  { id: "1TI", name: "1 Timothy" },
  { id: "2TI", name: "2 Timothy" },
  { id: "TIT", name: "Titus" },
  { id: "PHM", name: "Philemon" },
  { id: "HEB", name: "Hebrews" },
  { id: "JAS", name: "James" },
  { id: "1PE", name: "1 Peter" },
  { id: "2PE", name: "2 Peter" },
  { id: "1JN", name: "1 John" },
  { id: "2JN", name: "2 John" },
  { id: "3JN", name: "3 John" },
  { id: "JUD", name: "Jude" },
  { id: "REV", name: "Revelation" },
];

/**
 * Preferred bible versions
 * @type {[ { id: string, abbr: string }* ]}
 */
export const bibles_versions = [
  { abbr: "KJV", id: "de4e12af7f28f599-01" },
  { abbr: "NASB", id: "NAS" },
  { abbr: "ESV", id: "ESV" },
  { abbr: "ASV", id: "06125adad2d5898a-01" },
  { abbr: "NET", id: "NET" },
  { abbr: "LSV", id: "01b29f4b342acc35-01" },
  { abbr: "FBV", id: "65eec8e0b60e656b-01" },
  { abbr: "WEB", id: "9879dbb7cfe39e4d-01" },
];

export const copyright_info = {
  NASB: {
    copy: `New American Standard Bible®, Copyright © 1960, 1971, 1977, 1995, 2020 by The Lockman Foundation. All rights reserved. The “NASB,” “NAS,” “New American Standard Bible,” and “New American Standard,” are trademarks registered in the United States Patent and Trademark Office by The Lockman Foundation. Use of these trademarks requires the permission of The Lockman Foundation.`,
  },
  ESV: {
    href: "http://www.esv.org",
    copy: "Copyright ©2022 esv.org",
  },
  NET: {
    href: "http://www.bible.org",
    copy: "Copyright ©1996-2022 Bible.org",
  },
};
copyright_info.NAS = copyright_info.NASB;

/**
 * Special link settings for days when normal calls didn't happen
 */
export const call_links = {
  "2021-10-13.md": {
    morning: false,
    noon: true,
    evening: "https://billyebrim.org/wednesday-evening-oct-13/",
  },
  "2021-12-29.md": {
    morning: true,
    noon: false,
    evening: "https://www.aglorious.church/media",
  },
  "2021-09-18.md": {
    morning: false,
    noon: false,
    evening: "https://www.youtube.com/watch?v=G1dwMXd5cGQ",
  },
};

export const key_codes = {
  esc: 27,
  space: 32,
  enter: 13,
  tab: 9,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  home: 36,
  end: 35,
  n: 78,
  p: 80,
};
key_codes.radio = {
  prev: [key_codes.left, key_codes.up],
  next: [key_codes.right, key_codes.down],
};
key_codes.arrows = [
  key_codes.left,
  key_codes.up,
  key_codes.right,
  key_codes.down,
];
