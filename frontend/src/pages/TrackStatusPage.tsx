import SearchForm from "../components/trackStatus/SearchForm";
import StatusCard from "../components/trackStatus/StatusCard";
import StatusTimeline from "../components/trackStatus/StatusTimeline";

function TrackStatusPage() {
  return (
    <main>
      <section>
        <h2>Track Application Status</h2>

        <p>
          Enter your reference number to check the status of your application.
        </p>

        <SearchForm />

        <StatusCard />

        <StatusTimeline />
      </section>
    </main>
  );
}

export default TrackStatusPage;