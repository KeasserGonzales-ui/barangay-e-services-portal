function AddressInformation() {
  return (
    <section>
      <h3>Address Information</h3>

      <div>
        <label htmlFor="houseNo">House No.</label>
        <br />
        <input
          type="text"
          id="houseNo"
          placeholder="Enter house number"
        />
      </div>

      <br />

      <div>
        <label htmlFor="street">Street</label>
        <br />
        <input
          type="text"
          id="street"
          placeholder="Enter street name"
        />
      </div>

      <br />

      <div>
        <label htmlFor="purok">Purok / Sitio</label>
        <br />
        <input
          type="text"
          id="purok"
          placeholder="Enter purok or sitio"
        />
      </div>

      <br />

      <div>
        <label htmlFor="barangay">Barangay</label>
        <br />
        <input
          type="text"
          id="barangay"
          placeholder="Enter barangay"
        />
      </div>

      <br />

      <div>
        <label htmlFor="city">City / Municipality</label>
        <br />
        <input
          type="text"
          id="city"
          placeholder="Enter city or municipality"
        />
      </div>
    </section>
  );
}

export default AddressInformation;