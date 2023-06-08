/* eslint-disable jsx-a11y/label-has-associated-control */
import { Avatar, Button, Modal, TextInput } from 'flowbite-react';
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import { HiCheck } from 'react-icons/hi';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { getAllUsers } from '@/redux/features/users/userSlice';
import { addReviewer } from '@/api/reviewer.api';

const PeerReviewer = () => {
  const { activeCycle } = useAppSelector(state => state.cycle);
  const { reviewers, loading } = useAppSelector(
    state => state.reviewer,
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const { tokenData } = useAppSelector(state => state.profile);
  const { users } = useAppSelector(state => state.users);
  const [show, setShow] = useState(false);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  const addAddReviewer = async (reviewerId: string) => {
    if (loading) return;
    if (!reviewers.find(item => item.reviewerId === reviewerId)) {
      await dispatch(
        addReviewer({
          reviewCycleId: activeCycle?.id as string,
          reviewerId,
        }),
      );
    }
  };

  useEffect(() => {
    if (!users.length) {
      dispatch(getAllUsers());
    }
  }, [users]);

  const onSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [],
  );

  const userReviewers = users
    .filter(user => user.id !== tokenData?.id)
    .filter(user => {
      if (search) {
        return user.email
          .toLowerCase()
          .includes(search.toLowerCase());
      }
      return true;
    })
    .filter(user => user.role === 'developer')
    .slice(0, 5);

  return (
    <>
      <Button onClick={() => setShow(!show)}>Peer Reviewers</Button>
      <Modal show={show} size="md" popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
              Choose up to 2 reviewers
            </h3>
            <TextInput
              sizing="sm"
              className="w-full"
              type="search"
              placeholder="Type a user..."
              onChange={onSearch}
              ref={searchRef}
              onBlur={() => {
                setTimeout(() => {
                  searchRef.current?.focus();
                }, 100);
              }}
            />
            <ul className="my-4 space-y-3">
              {userReviewers.map(user => (
                <li key={user.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => addAddReviewer(user.id)}
                    onKeyDown={() => addAddReviewer(user.id)}
                    className={`${
                      loading
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    } relative group flex items-center rounded-lg bg-gray-50 p-3 text-base text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500`}
                  >
                    <div className="shrink-0">
                      {user.avatar ? (
                        <Avatar size="sm" img={user.avatar} rounded />
                      ) : (
                        <Avatar size="sm" rounded />
                      )}
                    </div>
                    <p className="px-3 flex-1 whitespace-nowrap truncate">
                      {user.email}
                    </p>

                    <div className="right-2 absolute">
                      {reviewers.find(
                        item => item.reviewerId === user.id,
                      ) ? (
                        <HiCheck />
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PeerReviewer;
