/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      sidebar_bg: "#FFFAF9",
      main_page_bg:"#FDFAFB",
      sidebar_text:"#6F6C99",
      dashboard_border:"#E2E2E8",
      dashboard_bg:"#53B9EA",
      delate_btn:"#CC0000",
      edit_btn:"#4EC990",
      white_color:"#FFFFFF",
      button_bg:"#00aaff",
      height: "600px",
      sinfle_shadow:"0px 4px 40px rgba(91, 99, 169, 0.3)",
      img_color:"#FD648E",
      color_green:"#1D262C",
      person_color:"#41477A",
      present:"100%"
    },
  },
  plugins: [],
}
