export function MapLegend() {
  const items = [
    { color: "bg-red-500", label: "Growing (<50)" },
    { color: "bg-amber-500", label: "Strong (50+)" },
    { color: "bg-emerald-500", label: "High (100+)" },
  ];

  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${item.color} shadow-sm`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
