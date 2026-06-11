interface StatusTimelineProps {
  timeline: string[];
  currentStatus: string;
}

function StatusTimeline({
  timeline,
  currentStatus,
}: StatusTimelineProps) {
  const getIcon = (step: string) => {
    if (step === currentStatus) {
      return "🟡";
    }

    const currentIndex = timeline.indexOf(currentStatus);
    const stepIndex = timeline.indexOf(step);

    if (
      currentIndex !== -1 &&
      stepIndex !== -1 &&
      stepIndex < currentIndex
    ) {
      return "✅";
    }

    return "⚪";
  };

  return (
    <div>
      <h3>Application Progress</h3>

      <ul>
        {timeline.map((step) => (
          <li key={step}>
            {getIcon(step)} {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatusTimeline;