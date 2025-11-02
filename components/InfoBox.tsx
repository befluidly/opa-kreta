interface InfoBoxProps {
  title?: string;
  children: React.ReactNode;
}

export default function InfoBox({
  title = "Praktische info",
  children,
}: InfoBoxProps) {
  return (
    <aside className="relative my-8 rounded-md bg-white shadow-md overflow-hidden">
      {/* 🔹 Accentbalk bovenaan */}
      <div className="h-1.5 bg-skyBlue" />

      {/* p-4 = standaard padding, pt-3 = iets minder bovenaan */}
      <div className="pt-0 px-8 pb-8 text-sm text-gray-700 leading-relaxed">
        {title && (
          <h3 className="text-base font-semibold !text-darkCornflower mb-2">
            {title}
          </h3>
        )}

        <div className="font-normal whitespace-pre-line leading-relaxed [&_p]:!m-0 [&_p]:!my-0 [&_p+p]:!mt-0">
  {children}
</div>
      </div>
    </aside>
  );
}
