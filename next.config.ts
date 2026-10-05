import type { NextConfig } from "next";
import { getUmamiConfig, UMAMI_PROXY_PATH } from "./src/lib/umami";

const umami = getUmamiConfig();

const nextConfig: NextConfig = {
  // Serves the Umami script and collection endpoint from this domain (see src/lib/umami.ts).
  rewrites: () =>
    Promise.resolve(
      umami
        ? [
            { source: `${UMAMI_PROXY_PATH}/script.js`, destination: umami.scriptUrl },
            { source: `${UMAMI_PROXY_PATH}/api/send`, destination: umami.apiUrl },
          ]
        : [],
    ),
};

export default nextConfig;
