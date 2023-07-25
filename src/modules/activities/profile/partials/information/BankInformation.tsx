import { Label, TextInput } from 'flowbite-react';
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

const BankInformation = ({ onSubmit, data, children }: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(profileSchema.bank),
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold">Bank Information</h2>

      <div className="inline-grid md:grid-cols-2 gap-x-10 gap-y-4 mt-4 w-full">
        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="BankName"
            color={errors.BankName ? 'failure' : 'gray'}
          >
            Bank name
          </Label>
          <TextInput
            type="text"
            id="BankName"
            color={errors.BankName ? 'failure' : 'gray'}
            placeholder="Bank name"
            {...register('BankName')}
          />
          {errors.BankName && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.BankName.message as string)}
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="accountName"
            color={errors.accountName ? 'failure' : 'gray'}
          >
            Account name
          </Label>
          <TextInput
            type="text"
            id="accountName"
            color={errors.accountName ? 'failure' : 'gray'}
            placeholder="Account name"
            {...register('accountName')}
          />
          {errors.accountName && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.accountName.message as string)}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="Currency"
            color={errors.Currency ? 'failure' : 'gray'}
          >
            Currency
          </Label>
          <TextInput
            type="text"
            id="Currency"
            color={errors.Currency ? 'failure' : 'gray'}
            placeholder="Currency"
            {...register('Currency')}
          />
          {errors.Currency && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.Currency.message as string)}
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label
            htmlFor="SwiftCode"
            color={errors.SwiftCode ? 'failure' : 'gray'}
          >
            Swift code
          </Label>
          <TextInput
            type="text"
            id="SwiftCode"
            color={errors.SwiftCode ? 'failure' : 'gray'}
            placeholder="Swift code"
            {...register('SwiftCode')}
          />
          {errors.SwiftCode && (
            <span className="text-red-500 text-sm">
              {formatJoiErorr(errors.SwiftCode.message as string)}
            </span>
          )}
        </div>
      </div>
      {children}
    </form>
  );
};

export default BankInformation;
