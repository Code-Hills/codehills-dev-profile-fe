/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';

const users = [
  {
    avatar:
      'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
    name: 'Neil Sims',
  },
  {
    avatar:
      'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
    name: 'Bonnie Green',
  },
];

const PeerReview = () => {
  const [show, setShow] = useState(false);
  const [reviewers, setReviewers] = useState<Record<string, any>[]>(
    [],
  );
  const [selectedReviewers, setSelectedReviewers] = useState<
    Record<string, any>[]
  >([]);

  const handleSelectReviewer = (reviewer: Record<string, any>) => {
    setSelectedReviewers([...selectedReviewers, reviewer]);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // submit form data to backend
  };

  const onClose = () => {
    setShow(false);
  };

  const addAddReviewer = (reviewer: Record<string, any>) => {
    if (!reviewers.find(item => item.name === reviewer.name)) {
      setReviewers(prev => [...prev, reviewer]);
    } else {
      setReviewers(prev =>
        prev.filter(item => item.name !== reviewer.name),
      );
    }
  };

  return (
    <>
      <Button onClick={() => setShow(!show)}>Peer Reviewers</Button>
      <Modal show={show} size="md" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
          >
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
              Choose up to 2 reviewers
            </h3>
            <TextInput
              sizing="sm"
              className="w-full"
              type="search"
              placeholder="Type a user..."
            />
            <ul className="my-4 space-y-3">
              {users.map(user => (
                <li key={user.name}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => addAddReviewer(user)}
                    onKeyDown={() => addAddReviewer(user)}
                    className="cursor-pointer relative group flex items-center rounded-lg bg-gray-50 p-3 text-base text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  >
                    <div className="shrink-0">
                      <img
                        className="h-5 w-5 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                    </div>
                    <p className="px-3 flex-1 whitespace-nowrap truncate">
                      {user.name}
                    </p>

                    <div className="right-2 absolute">
                      {reviewers.find(
                        item => item.name === user.name,
                      ) ? (
                        <HiCheck />
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PeerReview;
