/* eslint-disable security/detect-object-injection */
import { Button, Modal, Spinner } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useState, useEffect } from 'react';
import {
  HiPencil,
  HiChevronRight,
  HiChevronLeft,
  HiX,
  HiCheck,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

import PersonalInformation from './information/PersonalInformation';
import AddressInformation from './information/AddressInformation';
import BankInformation from './information/BankInformation';

import profileSchema from '@/api/schema/profile';
import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { updateProfile } from '@/redux/features/profile/profileSlice';

const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const { user, updateError, isUpdating } = useAppSelector(
    state => state.profile,
  );

  const profile = user || {};

  const [schema, setSchema] = useState(profileSchema.personal);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
  });
  const [profileData, setProfileData] = useState({
    displayName: profile.displayName,
    firstName: profile.firstName,
    lastName: profile.lastName,
    gender: profile.gender,
    address: profile.address || {},
    bank: profile.bank || {},
  });
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const onClose = () => {
    if (isUpdating) return;
    setIsOpen(false);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const renderSteps = () => {
    switch (step) {
      case 1:
        return <PersonalInformation {...{ register, errors }} />;
      case 2:
        return <AddressInformation {...{ register, errors }} />;
      case 3:
        return <BankInformation {...{ register, errors }} />;
      default:
        return null;
    }
  };

  const updateUserProfile = async (payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (typeof payload[key] === 'object') {
        Object.keys(payload[key]).forEach(subKey => {
          formData.append(`${key}.${subKey}`, payload[key][subKey]);
        });
      } else {
        formData.append(key, payload[key]);
      }
    });
    await dispatch(updateProfile(formData));
    if (!updateError) {
      onClose();
      toast('Profile updated successfully');
      setStep(1);
    } else {
      toast.error(updateError || 'Profile update failed');
    }
  };

  const submitHandler = handleSubmit(data => {
    if (step < 3) {
      setStep(step + 1);
    }

    switch (step) {
      case 1:
        setProfileData({
          ...profileData,
          ...data,
        });
        break;
      case 2:
        setProfileData({
          ...profileData,
          address: {
            ...profileData.address,
            ...data,
          },
        });
        break;
      case 3:
        setProfileData(prev => {
          const payload = {
            ...prev,
            bank: {
              ...prev.bank,
              ...data,
            },
          };
          updateUserProfile(payload);
          return payload;
        });

        break;
      default:
        break;
    }
  });

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const { address, bank, ...others } = profileData;
    switch (step) {
      case 1:
        setSchema(profileSchema.personal);
        reset(others);
        break;
      case 2:
        setSchema(profileSchema.address);
        reset(address);
        break;
      case 3:
        setSchema(profileSchema.bank);
        reset(bank);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <>
      <Button gradientDuoTone="cyanToBlue" onClick={togglePopup} pill>
        <HiPencil className="mr-2 h-5 w-5" />
        Edit
      </Button>
      <Modal
        size="4xl"
        show={isOpen}
        position="top-center"
        onClose={onClose}
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <form onSubmit={submitHandler}>
          <Modal.Body>{renderSteps()}</Modal.Body>
          <Modal.Footer className="justify-end">
            <Button color="gray" type="button" onClick={handleBack}>
              {!(step > 1) ? (
                <>
                  <HiX className="mr-2 h-5 w-5" />
                  Cancel
                </>
              ) : (
                <>
                  <HiChevronLeft className="mr-2 h-5 w-5" />
                  Back
                </>
              )}
            </Button>
            <Button
              gradientDuoTone="cyanToBlue"
              type="submit"
              disabled={isUpdating}
            >
              {step === 3 ? (
                <>
                  Save
                  {isUpdating ? (
                    <Spinner
                      color="success"
                      size="sm"
                      className="ml-2"
                    />
                  ) : (
                    <HiCheck className="ml-2 h-5 w-5" />
                  )}
                </>
              ) : (
                <>
                  Next
                  <HiChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ProfileForm;
