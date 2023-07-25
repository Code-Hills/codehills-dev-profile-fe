import { Label, Select, TextInput } from 'flowbite-react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { formatJoiErorr } from '@/helpers/format';
import profileSchema from '@/api/schema/profile';

interface Props {
  onSubmit: (query: Record<string, any>) => void;
  data?: Record<string, any>;
  children?: React.ReactNode;
}

const PersonalInformation = ({ onSubmit, data, children }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(profileSchema.personal),
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <div className="inline-grid md:grid-cols-2 gap-x-10 gap-y-4 mt-6 w-full">
        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="displayName"
            color={errors.displayName ? 'failure' : 'gray'}
          >
            Display Name
          </Label>
          <TextInput
            type="text"
            id="displayName"
            color={errors.displayName ? 'failure' : 'gray'}
            placeholder="Display Name"
            {...register('displayName')}
          />
          {errors.displayName && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.displayName.message as string)}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="firstName"
            color={errors.firstName ? 'failure' : 'gray'}
          >
            First Name
          </Label>
          <TextInput
            type="text"
            id="firstName"
            color={errors.firstName ? 'failure' : 'gray'}
            placeholder="First Name"
            {...register('firstName')}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.firstName.message as string)}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="lastName"
            color={errors.lastName ? 'failure' : 'gray'}
          >
            Last Name
          </Label>
          <TextInput
            type="text"
            id="lastName"
            color={errors.lastName ? 'failure' : 'gray'}
            placeholder="Last Name"
            {...register('lastName')}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.lastName.message as string)}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="gender"
            color={errors.gender ? 'failure' : 'gray'}
          >
            Gender
          </Label>
          <Select
            id="gender"
            color={errors.gender ? 'failure' : 'gray'}
            {...register('gender')}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
          {errors.gender && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.gender.message as string)}
            </span>
          )}
        </div>
      </div>
      {children}
    </form>
  );
};

export default PersonalInformation;
