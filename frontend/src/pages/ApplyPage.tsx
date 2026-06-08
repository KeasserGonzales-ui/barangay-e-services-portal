import { useState } from "react";
import Header from "../components/Header";

function ApplyPage() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!fullName.trim()) {
      setError("Full Name is required.");
      return;
    }

    if (!address.trim()) {
      setError("Address is required.");
      return;
    }

    if (!contactNumber.trim()) {
      setError("Contact Number is required.");
      return;
    }

    if (!purpose) {
      setError("Please select a Purpose.");
      return;
    }

    setError("");

    const applicationData = {
      fullName,
      address,
      contactNumber,
      purpose,
    };

    console.log("Application Submitted:");
    console.log(applicationData);

    alert("Application submitted successfully!");
  }

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

          {error && (
            <p>
              ❌ {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <br />
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <br />

            <div>
              <label htmlFor="address">Address</label>
              <br />
              <textarea
                id="address"
                placeholder="Enter your complete address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <br />

            <div>
              <label htmlFor="contactNumber">Contact Number</label>
              <br />
              <input
                type="text"
                id="contactNumber"
                placeholder="09XXXXXXXXX"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>

            <br />

            <div>
              <label htmlFor="purpose">Purpose of Clearance</label>
              <br />
              <select
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                <option value="">Select Purpose</option>
                <option value="employment">Employment</option>
                <option value="business">Business</option>
                <option value="scholarship">Scholarship</option>
                <option value="loan">Loan Requirement</option>
                <option value="other">Other</option>
              </select>
            </div>

            <br />

            <button type="submit">Submit Application</button>
          </form>

          <section>
            <h3>Live Preview</h3>

            <p>Full Name: {fullName}</p>
            <p>Address: {address}</p>
            <p>Contact Number: {contactNumber}</p>
            <p>Purpose: {purpose}</p>
          </section>
        </section>
      </main>
    </>
  );
}

export default ApplyPage;