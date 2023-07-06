import { useState, useEffect } from 'react';
import { FaCaretDown, FaCheck, FaTimes } from 'react-icons/fa';
import { TiInfo } from 'react-icons/ti';

import {
  useAppSelector,
  useAppDispatch,
} from '@/modules/_partials/hooks/useRedux';
import { getAllUsers } from '@/redux/features/users/userSlice';
import SkeletonElement from '@/modules/_partials/shared/SkeletonElement';

export type SelectOption = {
  displayName: string;
  id: string | number;
  email: string;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  previousValue?: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  previousValue?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  placeholder?: string;
} & (SingleSelectProps | MultipleSelectProps);

const SelectInput = ({
  multiple,
  value,
  onChange,
  placeholder,
  previousValue,
}: SelectProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, users } = useAppSelector(
    state => state.users,
  );
  const [showUsers, setShowUsers] = useState(false);
  const [currentUsers, setCurrentUsers] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!multiple) {
      setCurrentUsers(
        users?.filter(
          (user: any) =>
            user.role === 'architect' &&
            user.id !== previousValue?.id,
        ),
      );
    } else {
      const newUsers = users.filter(
        user =>
          user.id !==
          previousValue?.find((vl: any) => vl?.id === user?.id)?.id,
      );

      setCurrentUsers(newUsers);
    }
  }, [showUsers]);

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.find(val => val.id === option.id)) {
        onChange(value.filter(vl => vl.id !== option.id));
      } else {
        onChange([...value, option]);
      }
    } else if (option !== value) onChange(option);
    else {
      onChange(undefined);
    }
  };

  const clearOptions = () => {
    return multiple ? onChange([]) : onChange(undefined);
  };

  const isSelectedOption = (option: SelectOption) => {
    return multiple
      ? value.find(val => val.id === option.id)
      : option === value;
  };

  return (
    <div
      aria-hidden="true"
      onClick={() => setShowUsers(prev => !prev)}
      onBlur={() => setShowUsers(false)}
      className="relative min-h-max border border-gray-300 dark:border-gray-600 flex items-center gap-1 min-h-10 rounded-md outline-none dark:bg-gray-700 bg-gray-50 focus:border-slate-100  p-1"
    >
      <span className="flex-1 px-2 text-sm flex gap-2 flex-wrap">
        {multiple
          ? value.map(vl => (
              <button
                type="button"
                key={vl?.id}
                className="bg-gray-300 dark:bg-slate-700 p-1 border border-gray-500 rounded-md flex gap-0.5 items-center hover:bg-zinc-300 dark:hover:bg-zinc-700 dark:focus:bg-zinc-700 focus:bg-zinc-300"
                onClick={evt => {
                  evt.preventDefault();
                  evt.stopPropagation();
                  selectOption(vl);
                }}
              >
                <span>{vl?.displayName}</span>
                <FaTimes
                  className="inline w-4 hover:text-red-400 focus:text-red-400"
                  fillOpacity={0.5}
                />
              </button>
            ))
          : value?.displayName}
        {!(multiple ? value.length > 0 : value?.displayName) && (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </span>
      <button
        type="button"
        onClick={evt => {
          evt.preventDefault();
          evt.stopPropagation();
          clearOptions();
        }}
        className="hover:text-gray-500  focus:text-gray-500 text-2xl -translate-y-[2px]"
      >
        &times;
      </button>
      <div className="self-start h-8 w-0.5 bg-gray-500" />
      <div className="">
        <FaCaretDown className="cursor-pointer mx-1 text-2xl" />
      </div>
      <div
        className={`${
          showUsers ? 'block' : 'hidden'
        } overflow-hidden border border-gray-300 dark:border-gray-600 rounded-md w-full absolute top-[calc(100%+0.35em)] left-0 bg-gray-50 dark:bg-gray-700 z-40`}
      >
        <ul className="max-h-44 overflow-auto">
          {isLoading && (
            <>
              <li className="px-8 py-2 text-sm relative">
                <SkeletonElement className="h-4 w-40" />
              </li>
              <li className="px-8 py-2 text-sm relative">
                <SkeletonElement className="h-4 w-40 " />
              </li>
            </>
          )}
          {!isLoading && error && (
            <li className="px-3 py-2 text-sm relative inline-flex items-center gap-2">
              <TiInfo className="w-5 h-5 text-red-500" />
              Oops! Network issue to load users... (refresh the page)
            </li>
          )}
          {!isLoading && users && currentUsers?.length > 0 ? (
            currentUsers?.map((user: Record<string, any | null>) => {
              const option = {
                displayName: user?.displayName,
                id: user?.id,
                email: user?.email,
              };
              return (
                <li
                  aria-hidden="true"
                  onClick={() => selectOption(option)}
                  key={option?.id}
                  className="px-6 cursor-pointer py-2 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm relative
              "
                >
                  <FaCheck
                    className={`${
                      isSelectedOption(option) ? 'inline' : 'hidden'
                    } absolute left-0 mx-1 top-3`}
                  />
                  {option?.displayName}
                </li>
              );
            })
          ) : (
            <li className="px-3 py-2 text-sm relative inline-flex items-center gap-2">
              {multiple
                ? 'All candidates are assigneed to this project'
                : 'Current lead is the only candidate'}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SelectInput;
