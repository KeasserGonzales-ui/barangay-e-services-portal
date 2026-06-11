interface StatusCardProps {
  trackingNumber: string;
  status: string;
  applicant: string;
  purpose: string;
}

function StatusCard({
  trackingNumber,
  status,
  applicant,
  purpose,
}: StatusCardProps) {
  return (
    <div>
      <h3>Application Status</h3>

      <p>
        <strong>Reference Number:</strong> {trackingNumber}
      </p>

      <p>
        <strong>Current Status:</strong> {status}
      </p>

      <p>
        <strong>Applicant:</strong> {applicant}
      </p>

      <p>
        <strong>Purpose:</strong> {purpose}
      </p>
    </div>
  );
}

export default StatusCard;