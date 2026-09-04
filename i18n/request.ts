import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["nl", "en"] as const;
const DEFAULT_LOCALE = "nl";

// Elke pagina/layout roept setRequestLocale(locale) aan vóór enige andere
// next-intl-aanroep (zie components/setRequestLocale-gebruik in app/(nl)/*
// en app/(en)/en/*) — dat vult next-intl's eigen, met React `cache()`
// opgebouwde request-store synchroon, zonder dat hier `headers()`/cookies
// gelezen moeten worden. Hierdoor kan `requestLocale` hieronder gewoon
// veilig gelezen worden zonder de statische generatie te breken (in
// tegenstelling tot wanneer er geen enkele pagina setRequestLocale aanroept
// — dan valt Next.js terug op écht dynamische, per-request headerdetectie
// zodra `requestLocale` wordt gelezen, en verliest elke pagina die
// getTranslations/useTranslations gebruikt haar statische generatie).
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = SUPPORTED_LOCALES.includes(requested as (typeof SUPPORTED_LOCALES)[number])
    ? (requested as (typeof SUPPORTED_LOCALES)[number])
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
