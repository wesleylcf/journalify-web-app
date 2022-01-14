import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: "filecache",
});

(async () => {
  await fileCache.setItem("test", "rest");
  const test = await fileCache.getItem("test");
})();

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // console.log('onResolve', args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }
        if (args.importer === "index.js") {
          return {
            namespace: "a",
            path: `https://unpkg.com/${args.path}`,
          };
        }
        return {
          namespace: "a",
          // does this work for path ? `${args.importer}${args.path.substring(1)}`
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // console.log('onLoad', args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            //console.log(message) was below const react
            contents: `
              const react = require("react-select");
            `,
          };
        }
        // console.log('path', args.path);
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          // console.log(args.path, 'retrieved from cache');
          return cachedResult;
        }
        let contents, req: any;
        let path = args.path;
        try {
          const { data, request } = await axios.get(path);
          contents = data;
          req = request;
        } catch (e) {
          let moduleName = [];
          for (let i = args.path.length; i > -1; i--) {
            if (args.path[i] === "/") {
              break;
            } else {
              moduleName.push(args.path[i]);
            }
          }
          const module = moduleName.reverse().join("");
          path = `http://unpkg.com/${module}`;
          const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
            path
          );
          if (cachedResult) {
            // console.log(path, 'retrieved from cache');
            return cachedResult;
          }
          const { data, request } = await axios.get(path);
          contents = data;
          req = request;
        }
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", req.responseURL).pathname,
        };
        await fileCache.setItem(path, result);
        return result;
      });
    },
  };
};
