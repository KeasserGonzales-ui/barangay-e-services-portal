import Header from "../components/Header";
import ApplicationForm from "../components/apply/ApplicationForm";

function ApplyPage() {
  return (
    <>
      <Header />

      <main>
        <section>
          <h2>Barangay Clearance Application Form</h2>

          <p>
            Please complete the form below to submit your Barangay Clearance
            application.
          </p>

          <ApplicationForm />
        </section>
      </main>
    </>
  );
}

export default ApplyPage;