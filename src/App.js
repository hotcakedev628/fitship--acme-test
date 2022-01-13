import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import axios from 'axios';
import Table from 'src/components/Table';
import Form from 'src/components/Form';
import { backendUri } from 'src/config';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const applyFilters = (addresses, query) => {
  return addresses.filter((address) => {
    let matches = true;

    if (query) {
      const properties = ['address1', 'city', 'state'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (address[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    return matches;
  });
};

function App() {
  const isMountedRef = useIsMountedRef();
  const [isLoading, setLoading] = useState(false);
  const [isNewOpen, setNewOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [query, setQuery] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const onChangeExpanded = () => {
    setExpanded((prev) => !prev);
  };

  const onChangeAddress = (name, value) => {
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetAddress = () => {
    setAddress({
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    });
    setSelectedAddressId(null);
  };

  const getAddresses = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${backendUri}/address`);

      if (isMountedRef) {
        setAddresses(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  const handleSaveAddress = async (id) => {console.log('save id', id)
    try {
      let response;

      if (id) {
        response = await axios.patch(`${backendUri}/address/${id}`, address);
      } else {
        response = await axios.post(`${backendUri}/address`, address);
      }

      if (response.data) {
        if (id) {
          setAddresses(prevAddresses => [
            ...prevAddresses,
            prevAddresses[prevAddresses.findIndex(address => address.id === id)] = response.data
          ]);
        } else {
          setAddresses(prevAddresses => [response.data, ...prevAddresses]);
        }
        resetAddress();
        setNewOpen(false);
      }
    } catch (err) {
      console.error(err);
      window.alert('something went bad');
    }
  };

  const handleEditAddress = (id) => {
    setSelectedAddressId(id);
    setNewOpen(true);
    setAddress(addresses.find(address => address.id === id));
  };

  const handleDeleteAddress = async (id) => {
    try {
      const response = await axios.delete(`${backendUri}/address/${id}`);

      if (response.data) {
        setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== id));
      }
    } catch (err) {
      console.error(err);
      window.alert('something went bad');
    }
  };

  // need to make this functional
  const handleChangeCollapsedAddress = (value) => {
    if (value.split(/\n/).length === 2) {
      const collapsed = value.split(/\n/);
      const address = collapsed.split(', ');

      setAddresses({
        name: collapsed[0],
        address1: address[0],
        address2: '',
        city: address[1],
        state: address[2],
        zip: address[3],
      });
    }
  };

  const columns = useMemo(() => 
  [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Address',
      accessor: 'address1',
    },
    {
      Header: 'Address 2',
      accessor: 'address2',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
    },
    {
      Header: 'ZIP',
      accessor: 'zip',
    }
  ], []);

  const data = useMemo(() => {
    const filteredAddresses = applyFilters(addresses, query);

    return filteredAddresses.map(address => ({
      id: address.id,
      name: address.name,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      zip: address.zip,
      isEditable: address.isEditable
    }));
  }, [addresses, query]);

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  return (
    <div className="App flex justify-center bg-gray-100">
      <div className="container flex flex-col">
        <div className="flex justify-between mt-1 mx-4">
          <button
            className="inline-flex items-center px-6 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setNewOpen(true)}
          >
            + New
          </button>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by address1, city, state"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-3 w-5/12 ml-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {
          isNewOpen && (
            <div className="flex justify-center">
              <Form
                isExpanded={isExpanded}
                address={address}
                onChangeExpanded={onChangeExpanded}
                onChangeAddress={onChangeAddress}
                onChangeCollapsedAddress={handleChangeCollapsedAddress}
                onSaveAddress={handleSaveAddress}
                selectedAddressId={selectedAddressId}
              />
            </div>
          )
        }
        <div className="overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {
                !isLoading
                  ? <Table
                      data={data}
                      columns={columns}
                      onDeleteAddress={handleDeleteAddress}
                      onEditAddress={handleEditAddress}
                    />
                  : <div className="w-full flex justify-center">
                      <img src="/static/images/loading.gif" alt="loading" />
                    </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
