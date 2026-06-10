function PersonalInformation() {
  return (
    <section>
      <h3>Personal Information</h3>

      <div>
        <label htmlFor="firstName">First Name</label>
        <br />
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
        />
      </div>

      <br />

      <div>
        <label htmlFor="middleName">Middle Name</label>
        <br />
        <input
          type="text"
          id="middleName"
          placeholder="Enter your middle name"
        />
      </div>

      <br />

      <div>
        <label htmlFor="lastName">Last Name</label>
        <br />
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
        />
      </div>

      <br />

      <div>
        <label htmlFor="suffix">Suffix</label>
        <br />
        <input
          type="text"
          id="suffix"
          placeholder="Jr., Sr., III (Optional)"
        />
      </div>
    </section>
  );
}

export default PersonalInformation;