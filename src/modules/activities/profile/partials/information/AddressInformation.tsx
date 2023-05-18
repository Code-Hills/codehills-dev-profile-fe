import { Label, TextInput } from 'flowbite-react';
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
} from 'react-hook-form';

import { formatJoiErorr } from '@/helpers/format';

const AddressInformation = ({
  register,
  errors,
}: {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold">Address</h2>

      <div className="inline-grid md:grid-cols-2 gap-x-10 gap-y-4 mt-4 w-full">
        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="country"
            color={errors.country ? 'failure' : 'gray'}
          >
            Country
          </Label>
          <TextInput
            type="text"
            id="country"
            color={errors.country ? 'failure' : 'gray'}
            placeholder="Country"
            {...register('country')}
          />
          {errors.country && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.country.message as string)}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="city"
            color={errors.city ? 'failure' : 'gray'}
          >
            City
          </Label>
          <TextInput
            type="text"
            id="city"
            color={errors.city ? 'failure' : 'gray'}
            placeholder="City"
            {...register('city')}
          />
          {errors.city && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.city.message as string)}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="street"
            color={errors.street ? 'failure' : 'gray'}
          >
            Street
          </Label>
          <TextInput
            type="text"
            id="street"
            color={errors.street ? 'failure' : 'gray'}
            placeholder="Street"
            {...register('street')}
          />
          {errors.street && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.street.message as string)}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressInformation;
