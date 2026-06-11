import Header from "../components/Header";
import ApplicationForm from "../components/apply/ApplicationForm";

function ApplyPage() {
  return (
    <>
      <Header />

      <main>
        <section>
          <h2>Barangay Clearance Application</h2>

          <p>
            Fill out the application form below and submit your request for a
            Barangay Clearance. After successful submission, a reference number
            will be generated that you can use to track the status of your
            application.
          </p>

          <ApplicationForm />
        </section>
      </main>
    </>
  );
}

export default ApplyPage;