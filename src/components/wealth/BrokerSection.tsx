// BrokerSection - links to broker accounts
export default function BrokerSection() {
  const brokers = [
    { name: "Robinhood", url: "https://robinhood.com", color: "#00C805" },
    { name: "Fidelity", url: "https://fidelity.com", color: "#006B3F" },
    { name: "Schwab", url: "https://schwab.com", color: "#00A0DC" },
    { name: "Coinbase", url: "https://coinbase.com", color: "#0052FF" },
  ];
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">Broker Links</h3>
      <div className="grid grid-cols-2 gap-2">
        {brokers.map(b => (
          <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: b.color }} />
            <span className="text-sm font-medium">{b.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
