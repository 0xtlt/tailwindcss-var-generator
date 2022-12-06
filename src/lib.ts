import { default as TWPlugin } from "tailwindcss/plugin";

type Kinds = "colors" | "font-sizes";

export function tailwindCssVariables(
	displayKinds: Kinds[] = ["colors", "font-sizes"]
) {
	// Return the plugin function that adds the CSS variables to the styles
	return TWPlugin(function ({ addBase, config }) {
		const twConfig = config();

		let cssVariablesObj = {};

		// Generate CSS variables for all of the colors defined in the Tailwind config
		if (displayKinds.includes("colors")) {
			cssVariablesObj = {
				...cssVariablesObj,
				...Object.entries(twConfig.theme?.colors ?? {})
					.map(([name, value]) =>
						typeof value === "object"
							? Object.entries(value).map(([childName, childValue]) => ({
									[`--color-${name}-${childName}`]: childValue,
							  }))
							: [
									{
										[`--color-${name}`]: value,
									},
							  ]
					)
					.flat()
					.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
			};
		}

		// Generate CSS variables for all of the sizes defined in the Tailwind config
		if (displayKinds.includes("font-sizes")) {
			cssVariablesObj = {
				...cssVariablesObj,
				...Object.entries(twConfig.theme?.fontSize ?? {})
					.map(([name, value]) =>
						typeof value === "string"
							? {
									[`--size-${name}`]: value,
							  }
							: [
									{
										[`--size-${name}`]: value[0],
									},
									...Object.entries(value[1]).map(
										([childName, childValue]) => ({
											[`--size-${name}-${childName}`]: childValue,
										})
									),
							  ]
					)
					.flat()
					.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
			};
		}

		addBase({
			":root": cssVariablesObj,
		});
	});
}
