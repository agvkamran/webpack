import { BuildOptions } from "typescript";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === "development";
  const isProd = mode === "production";

//   const plugins = [];

//   if (isProd) {
//     plugins.push(removeDataTestIdBabelPlugin, {
//       props: ["data-testid"],
//     });
//   }

  return {
    test: /\.m?tsx$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          [
            "@babel/preset-react",
            {
              runtime: isDev ? "automatic" : "classic",
            },
          ],
        ],
        // plugins: plugins.length ? plugins : undefined,
        plugins: [
          [
            removeDataTestIdBabelPlugin,
            {
              props: ["data-testid"],
            },
          ],
        ],
      },
    },
  };
}
