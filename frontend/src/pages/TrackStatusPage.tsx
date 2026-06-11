import { useState } from "react";

import Header from "../components/Header";
import SearchForm from "../components/trackStatus/SearchForm";
import StatusCard from "../components/trackStatus/StatusCard";
import StatusTimeline from "../components/trackStatus/StatusTimeline";

interface TrackingResponse {
  success: boolean;
  trackingNumber: string;
  applicant: string;
  purpose: string;
  status: string;
  timeline: string[];
}

function TrackStatusPage() {
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] =
    useState<TrackingResponse | null>(null);
  const [error, setError] = useState("");

  const handleSearch = async (trackingNumber: string) => {
    try {
      setLoading(true);
      setError("");
      setTrackingData(null);

      const response = await fetch(
        `http://localhost:5000/api/tracking/${trackingNumber}`
      );

      const data: TrackingResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("Application not found.");
      }

      setTrackingData(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to retrieve application status."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main>
        <section>
          <h2>Track Application Status</h2>

          <p>
            Enter your reference number to check the status of your
            application.
          </p>

          <SearchForm
            onSearch={handleSearch}
            loading={loading}
          />

          {error && (
            <p>
              <strong>{error}</strong>
            </p>
          )}

          {trackingData && (
            <>
              <StatusCard
                trackingNumber={trackingData.trackingNumber}
                status={trackingData.status}
                applicant={trackingData.applicant}
                purpose={trackingData.purpose}
              />

              <StatusTimeline
                timeline={trackingData.timeline}
                currentStatus={trackingData.status}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default TrackStatusPage;