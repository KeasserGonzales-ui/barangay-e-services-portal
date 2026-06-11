import { useState } from "react";
import type { FormEvent } from "react";

interface SearchFormProps {
  onSearch: (trackingNumber: string) => void;
  loading?: boolean;
}

function SearchForm({
  onSearch,
  loading = false,
}: SearchFormProps) {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = trackingNumber.trim();

    if (!value) {
      return;
    }

    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Track Your Application</h2>

        <label htmlFor="trackingNumber">
          Reference Number
        </label>

        <br />
        <br />

        <input
          id="trackingNumber"
          type="text"
          value={trackingNumber}
          onChange={(event) =>
            setTrackingNumber(event.target.value.toUpperCase())
          }
          placeholder="Enter your reference number"
          autoComplete="off"
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={loading || !trackingNumber.trim()}
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>
    </form>
  );
}

export default SearchForm;