function PurposeInformation() {
  return (
    <section>
      <h3>Application Information</h3>

      <div>
        <label htmlFor="contactNumber">Contact Number</label>
        <br />
        <input
          type="text"
          id="contactNumber"
          placeholder="09XXXXXXXXX"
        />
      </div>

      <br />

      <div>
        <label htmlFor="purpose">Purpose of Clearance</label>
        <br />
        <select id="purpose">
          <option value="">Select Purpose</option>
          <option value="employment">Employment</option>
          <option value="business">Business</option>
          <option value="scholarship">Scholarship</option>
          <option value="loan">Loan Requirement</option>
          <option value="other">Other</option>
        </select>
      </div>

      <br />

      <div>
        <label htmlFor="remarks">Remarks</label>
        <br />
        <textarea
          id="remarks"
          rows={3}
          placeholder="Additional information (Optional)"
        />
      </div>
    </section>
  );
}

export default PurposeInformation;