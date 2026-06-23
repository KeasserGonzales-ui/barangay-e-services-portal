interface ResidentStatistics {
  totalResidents: number;
  activeResidents: number;
  inactiveResidents: number;
  maleResidents: number;
  femaleResidents: number;
}

interface ResidentStatisticsCardsProps {
  statistics: ResidentStatistics;
}

export default function ResidentStatisticsCards({
  statistics,
}: ResidentStatisticsCardsProps) {
  const cards = [
    {
      title: "Total Residents",
      value: statistics.totalResidents,
    },
    {
      title: "Active Residents",
      value: statistics.activeResidents,
    },
    {
      title: "Inactive Residents",
      value: statistics.inactiveResidents,
    },
    {
      title: "Male Residents",
      value: statistics.maleResidents,
    },
    {
      title: "Female Residents",
      value: statistics.femaleResidents,
    },
  ];

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "18px",
            background: "#fff",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "8px",
            }}
          >
            {card.title}
          </div>

          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            {card.value}
          </div>
        </div>
      ))}
    </section>
  );
}