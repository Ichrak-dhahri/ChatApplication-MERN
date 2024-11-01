const GenderCheckbox = () => {
    return (
      <div className="flex">
        <div className="form-control">
          <label className="label gap-2 cursor-pointer">
            <span className="mb-1 text-gray-300 font-semibold text-sm">Male</span>
            <input type="checkbox" className="checkbox checkbox-secondary" />
          </label>
        </div>
        <div className="form-control">
          <label className="label gap-2 cursor-pointer">
            <span className="mb-1 text-gray-300 font-semibold text-sm">Female</span>
            <input type="checkbox" className="checkbox checkbox-secondary" />
          </label>
        </div>
      </div>
    );
  };
  
  export default GenderCheckbox;