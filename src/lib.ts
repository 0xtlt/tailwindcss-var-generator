import type { Config } from "tailwindcss";
import { default as TWPlugin } from "tailwindcss/plugin";

type Kinds = "colors" | "font-sizes";

export function tailwindCssVariables(
	displayKinds: Kinds[] = ["colors", "font-sizes"]
) {
	// Return the plugin function that adds the CSS variables to the styles
	return TWPlugin(function ({ addBase, config }) {
		const twConfig = config();
		// Generate CSS variables for all of the colors defined in the Tailwind config
		const colorVariables = displayKinds.includes("colors")
			? Object.entries(twConfig.theme?.colors ?? {})
					.map(([name, value]) =>
						typeof value === "object"
							? Object.entries(value).map(
									([childName, childValue]) =>
										`--color-${name}-${childName}: ${childValue};`
							  )
							: [`--color-${name}: ${value};`]
					)
					.flat()
			: [];

		// Generate CSS variables for all of the sizes defined in the Tailwind config
		const sizeVariables = displayKinds.includes("font-sizes")
			? Object.entries(twConfig.theme?.fontSize ?? {})
					.map(([name, value]) =>
						typeof value === "string"
							? [`--size-${name}: ${value}`]
							: [
									`--size-${name}: ${value[0]};`,
									...Object.entries(value[1]).map(
										([childName, childValue]) =>
											`--size-${name}-${childName}: ${childValue};`
									),
							  ]
					)
					.flat()
			: [];

		// Combine all of the CSS variables into a single string
		const cssVariables = [...colorVariables, ...sizeVariables].join("\n");

		addBase({
			":root": `{
        ${cssVariables}
      }`,
		});
	});
}
