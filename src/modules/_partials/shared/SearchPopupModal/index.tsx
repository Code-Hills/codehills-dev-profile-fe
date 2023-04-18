import { Button, Modal, TextInput } from 'flowbite-react';
import React from 'react';
import { HiSearch } from 'react-icons/hi';

import Searchbar from '../Searchbar';

const SearchPopupModal = () => {
  const [show, setShow] = React.useState(false);
  const onClose = () => {
    setShow(false);
  };
  return (
    <>
      <Button
        outline
        pill
        onClick={() => setShow(!show)}
        className="md:hidden"
      >
        <HiSearch className="h-6 w-6" />
      </Button>
      <div className="hidden md:flex flex-grow max-w-2xl w-full">
        <Searchbar />
      </div>
      <Modal
        show={show}
        size="4xl"
        position="top-right"
        onClose={onClose}
      >
        <Modal.Header className="items-center space-x-2">
          <Searchbar />
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 px-4">
            <p className="text-gray-600 dark:text-gray-400">
              No results
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SearchPopupModal;
