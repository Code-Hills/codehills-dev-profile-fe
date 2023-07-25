import { Button, Modal, Spinner } from 'flowbite-react';
import { useState, useMemo, useEffect } from 'react';
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

  const [profileData, setProfileData] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: {},
    bank: {},
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

  const updateUserProfile = async (payload: any) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (typeof payload[key] === 'object') {
        formData.append(key, JSON.stringify(payload[key]));
        // Object.keys(payload[key]).forEach(subKey => {
        //   formData.append(`${key}.${subKey}`, payload[key][subKey]);
        // });
      } else {
        formData.append(key, payload[key]);
      }
    });
    const { payload: result } = await dispatch(
      updateProfile(formData),
    );
    if (result) {
      onClose();
      setStep(1);
    }
  };

  const submitHandler = (data: any) => {
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
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const FormComponent = useMemo(() => {
    switch (step) {
      case 1:
        return PersonalInformation;
      case 2:
        return AddressInformation;
      case 3:
        return BankInformation;
      default:
        return PersonalInformation;
    }
  }, [step]);

  const getFormData = () => {
    const { address, bank, ...others } = profileData;
    switch (step) {
      case 1:
        return others;
      case 2:
        return address;
      case 3:
        return bank;
      default:
        return others;
    }
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        gender: user.gender,
        address: user.address || {},
        bank: user.bank || {},
      });
    }
  }, [user]);

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
        <Modal.Body>
          <FormComponent
            onSubmit={submitHandler}
            data={getFormData()}
          >
            <Modal.Footer className="justify-end mt-4">
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
          </FormComponent>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileForm;
