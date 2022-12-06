# tailwindcss-var-generator

A plugin for Tailwind CSS that generates CSS variables for all of the colors, sizes, and other styles defined in your Tailwind config. This allows you to use the styles from your Tailwind config directly in your CSS code.

## Installation

To install this package, run the following command:

```bash
npm install tailwindcss-var-generator
```

## Usage

First, you need to import the `tailwindCssVariables` function from this package and add it to your Tailwind plugin list:

```js
const plugin = require("tailwindcss/plugin");

const { tailwindCssVariables } = require("tailwindcss-var-generator");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {},
  plugins: [tailwindCssVariables()],
};
```

The `tailwindCssVariables` function takes one optional argument, displayKinds, which is an array of styles that you want to generate CSS variables for. By default, it will generate CSS variables for colors and font sizes. You can pass in any combination of the following values to customize which styles to include:

- "colors": generates CSS variables for all of the colors defined in the Tailwind config.
- "font-sizes": generates CSS variables for all of the font sizes defined in the Tailwind config.

For example, if you only want to generate CSS variables for colors, you can call the `tailwindCssVariables` function like this:

```js
tailwindCssVariables(["colors"]);
```

Once you have added the `tailwindCssVariables` function to your Tailwind plugin list, you can use the generated CSS variables in your CSS code:

```css
/*
 * This will use the value of the `red.500` color defined in your Tailwind
 * config as the value of the `color` property.
 */
.my-class {
  color: var(--color-red-500);
}
```
