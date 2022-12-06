const { tailwindCssVariables } = require("../lib/index");

/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {},
	plugins: [tailwindCssVariables()],
};
