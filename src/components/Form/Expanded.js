const addressItems = [
  {
    id: 'name',
    label: 'Name',
    autoComplete: 'name'
  },
  {
    id: 'address1',
    label: 'Address'
  },
  {
    id: 'address2',
    label: 'Address 2',
    isOptional: true
  },
  {
    id: 'city',
    label: 'City',
    autoComplete: 'street-address'
  },
  {
    id: 'state',
    label: 'State'
  },
  {
    id: 'zip',
    label: 'Zip',
    autoComplete: 'postal-code'
  },
];

const Expanded = ({
  address,
  onchangeAddress
}) => {
  return (
    <>
      {
        addressItems.map(item => (
          <div key={item.id} className="my-2">
            <label
              htmlFor={item.id}
              className="block text-sm font-medium text-gray-700"
            >
              {`${item.label}${item.isOptional ? ' (optional)' : ''}`}
            </label>
            <input
              type="text"
              name={item.id}
              id={item.id}
              autoComplete={item.autoComplete}
              className="mt-1 px-2 py-1.5 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
              value={address[item.id]}
              onChange={(e) => onchangeAddress(item.id, e.target.value)}
            />
          </div>
        ))
      }
    </>
  );
};

export default Expanded;
