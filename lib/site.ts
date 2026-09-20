// Eén bron van waarheid voor het canonieke basisdomein. De rest van de
// codebase (generateMetadata in de [...slug]/pagina's, next-sitemap.config.cjs,
// de root layouts) herhaalt vandaag nog steeds de losse string
// "https://www.opakreta.be" — dit bestand voegt daar niets aan toe, het geeft
// enkel de structured-data-code (lib/structuredData.ts, components/JsonLd.tsx)
// één plek om diezelfde waarde vandaan te halen, zodat canonical-URL's in
// JSON-LD nooit per ongeluk afwijken van de rest van de site.
export const SITE_URL = "https://www.opakreta.be";

// Zet een site-relatief pad ("/pad", of "" voor de homepage) om naar een
// absolute URL. Een waarde die al absoluut is (bv. een externe coverImage-URL
// van Pexels/Unsplash) wordt ongewijzigd teruggegeven.
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
