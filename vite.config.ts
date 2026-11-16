import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";

const isNetlify = typeof process !== "undefined" && Boolean(process.env["NETLIFY"]);

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro(
      isNetlify
        ? { preset: "netlify" }
        : { defaultPreset: "cloudflare-module" },
    ),
    viteReact(),
  ],
});
