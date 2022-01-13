import Collapsed from "./Collapsed";
import Expanded from "./Expanded";

const Form = ({
  isExpanded,
  onChangeExpanded,
  onChangeAddress,
  onChangeCollapsedAddress,
  onSaveAddress,
  address,
  selectedAddressId
}) => {
  return (
    <div className="mt-5 w-full max-w-xs">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-2 text-gray-500 text-sm">
          To Address
        </div>
        <div className="px-4 py-5 bg-white sm:p-4">
          <div className="flex justify-end pb-2">
            <a href="#" className="text-sm text-indigo-600" onClick={() => onChangeExpanded()}>
              {isExpanded ? 'Switch to Freeform' : 'Switch to Fields'}
            </a>
          </div>
          <div className="flex flex-col">
            {
              isExpanded
                ? <Expanded
                    isExpanded={isExpanded}
                    onChangeExpanded={onChangeExpanded}
                    onchangeAddress={onChangeAddress}
                    address={address}
                  />
                : <Collapsed
                    isExpanded={isExpanded}
                    onChangeExpanded={onChangeExpanded}
                    onChangeCollapsedAddress={onChangeCollapsedAddress}
                  />
            }
          </div>
          <div className="py-3">
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
              onClick={() => onSaveAddress(selectedAddressId)}
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Form;
