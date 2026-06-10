function SearchForm() {
  return (
   <div>
        <h2>Track Your Application</h2>

        <label>Reference Number</label>
<       input
         type="text"
        placeholder="Enter your reference number"
       />
       <button type="submit">
      Check Status
    </button>
    
</div>
  );
}

export default SearchForm;