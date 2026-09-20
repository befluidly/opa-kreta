// Server component — rendert een willekeurig serialiseerbaar object als
// <script type="application/ld+json">. Escaped "<" naar het niet-uitvoerbare
// unicode-escape "<", zodat data die toevallig "</script>" bevat (bv.
// een titel of excerpt met een "<"-teken) de omringende <script>-tag niet kan
// afbreken — het standaard, door OWASP aanbevolen escape-patroon voor JSON
// die in een <script>-tag wordt ingebed.
export default function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
