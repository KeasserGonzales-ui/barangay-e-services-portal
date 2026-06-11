import { useState } from "react";

function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    houseNo: "",
    street: "",
    purok: "",
    barangay: "",
    city: "",
    contactNumber: "",
    purpose: "",
    remarks: "",
  });

  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!formData.firstName.trim()) {
      setError("First Name is required.");
      return;
    }

    if (!formData.lastName.trim()) {
      setError("Last Name is required.");
      return;
    }

    if (!formData.contactNumber.trim()) {
      setError("Contact Number is required.");
      return;
    }

    if (!formData.purpose) {
      setError("Please select a Purpose.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Application failed.");
        return;
      }

      alert(`✅ Application Submitted Successfully

Tracking Number:
${result.trackingNumber}

Status:
${result.status}`);

      console.log(result);

      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        houseNo: "",
        street: "",
        purok: "",
        barangay: "",
        city: "",
        contactNumber: "",
        purpose: "",
        remarks: "",
      });
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    }
  }

  return (
    <>
      {error && <p>❌ {error}</p>}

      <form onSubmit={handleSubmit}>
        <h3>Personal Information</h3>

        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <br /><br />

        <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
        <br /><br />

        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <br /><br />

        <input type="text" name="suffix" placeholder="Suffix" value={formData.suffix} onChange={handleChange} />
        <br /><br />

        <h3>Address Information</h3>

        <input type="text" name="houseNo" placeholder="House No." value={formData.houseNo} onChange={handleChange} />
        <br /><br />

        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
        <br /><br />

        <input type="text" name="purok" placeholder="Purok / Sitio" value={formData.purok} onChange={handleChange} />
        <br /><br />

        <input type="text" name="barangay" placeholder="Barangay" value={formData.barangay} onChange={handleChange} />
        <br /><br />

        <input type="text" name="city" placeholder="City / Municipality" value={formData.city} onChange={handleChange} />
        <br /><br />

        <h3>Application Information</h3>

        <input type="text" name="contactNumber" placeholder="09XXXXXXXXX" value={formData.contactNumber} onChange={handleChange} />
        <br /><br />

        <select name="purpose" value={formData.purpose} onChange={handleChange}>
          <option value="">Select Purpose</option>
          <option value="employment">Employment</option>
          <option value="business">Business</option>
          <option value="scholarship">Scholarship</option>
          <option value="loan">Loan Requirement</option>
          <option value="other">Other</option>
        </select>

        <br /><br />

        <textarea
          name="remarks"
          rows={3}
          placeholder="Remarks (Optional)"
          value={formData.remarks}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Submit Application</button>
      </form>

      <section>
        <h3>Live Preview</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </section>
    </>
  );
}

export default ApplicationForm;
