import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Diese Seite hat keine Serverlogik – jede der acht Routen wird schon beim
   * Bauen zu fertigem HTML. `export` schreibt genau das nach `out/`.
   *
   * Vorteil: der Hoster muss kein Next.js beherrschen, er reicht nur Dateien
   * durch. Läuft damit auf Netlify, GitHub Pages, Cloudflare und jedem
   * beliebigen Webspace identisch – und kann nicht kaputtgehen, wenn ein
   * Hoster mal einer Next.js-Version hinterherhinkt.
   *
   * Wenn ihr später doch etwas Serverseitiges einbaut (echter Formularversand
   * über eine API-Route, Vorschaubilder aus next/image), muss diese Zeile
   * wieder raus.
   */
  output: "export",
};

export default nextConfig;
