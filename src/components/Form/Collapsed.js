const Collapsed = ({
  onChangeCollapsedAddress
}) => {
  return (
    <>
      <label className="block flex flex-col text-sm font-medium text-gray-700">
        Address (free-form)
        <span className="text-xs text-gray-400">Copy & paste the full address</span>
      </label>
      <textarea
        id="full-address"
        name="full-address"
        rows="3"
        className="mt-2 p-1 w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
        onChange={(e) => onChangeCollapsedAddress(e.target.value)}
      />
    </>
  );
};

export default Collapsed;
