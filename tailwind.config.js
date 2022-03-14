module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variant: {},
  plugins: [require("@tailwindcss/forms")],
};
