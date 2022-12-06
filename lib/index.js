var $kqxyr$tailwindcssplugin = require("tailwindcss/plugin");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "tailwindCssVariables", () => $6324ce8b5bc4dc81$export$a7ebef407ad17182);

function $6324ce8b5bc4dc81$export$a7ebef407ad17182(displayKinds = [
    "colors",
    "font-sizes"
]) {
    // Return the plugin function that adds the CSS variables to the styles
    return (0, ($parcel$interopDefault($kqxyr$tailwindcssplugin)))(function({ addBase: addBase , config: config  }) {
        const twConfig = config();
        let cssVariablesObj = {};
        // Generate CSS variables for all of the colors defined in the Tailwind config
        if (displayKinds.includes("colors")) cssVariablesObj = {
            ...cssVariablesObj,
            ...Object.entries(twConfig.theme?.colors ?? {}).map(([name, value])=>typeof value === "object" ? Object.entries(value).map(([childName, childValue])=>({
                        [`--color-${name}-${childName}`]: childValue
                    })) : [
                    {
                        [`--color-${name}`]: value
                    }
                ]).flat().reduce((acc, cur)=>({
                    ...acc,
                    ...cur
                }), {})
        };
        // Generate CSS variables for all of the sizes defined in the Tailwind config
        if (displayKinds.includes("font-sizes")) cssVariablesObj = {
            ...cssVariablesObj,
            ...Object.entries(twConfig.theme?.fontSize ?? {}).map(([name, value])=>typeof value === "string" ? {
                    [`--size-${name}`]: value
                } : [
                    {
                        [`--size-${name}`]: value[0]
                    },
                    ...Object.entries(value[1]).map(([childName, childValue])=>({
                            [`--size-${name}-${childName}`]: childValue
                        }))
                ]).flat().reduce((acc, cur)=>({
                    ...acc,
                    ...cur
                }), {})
        };
        addBase({
            ":root": cssVariablesObj
        });
    });
}


//# sourceMappingURL=index.js.map
