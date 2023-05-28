import { Avatar, Button, Modal, Spinner } from 'flowbite-react';
import { useState, useRef, ChangeEvent } from 'react';
import {
  HiPencil,
  HiX,
  HiCheck,
  HiUpload,
  HiRefresh,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

import {
  useAppDispatch,
  useAppSelector,
} from '@/modules/_partials/hooks/useRedux';
import { updateProfile } from '@/pages/profileSlice';

const ChangeAvatar = () => {
  const dispatch = useAppDispatch();
  const { user, updateError, isUpdating } = useAppSelector(
    state => state.profile,
  );

  const imageRef = useRef<HTMLInputElement>(null);

  const profile = user || {};
  const [image, setImage] = useState<File | null>();
  const [avatar, setAvatar] = useState<string | null>(
    profile.avatar || null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    if (isUpdating) return;
    setIsOpen(false);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setAvatar(reader.result as string);

      const newFile = files[0];

      reader.readAsDataURL(newFile);
      setImage(newFile);
    }
  };

  const updateUserProfile = async () => {
    const formData = new FormData();
    if (image) {
      formData.append('avatar', image);
    } else {
      toast.warn('Please select an image to upload');
      return;
    }
    await dispatch(updateProfile(formData));
    if (!updateError) {
      onClose();
      toast('Avatar updated successfully');
    } else {
      toast.error(updateError || 'Avatar update failed');
    }
  };

  return (
    <>
      <Button gradientDuoTone="cyanToBlue" onClick={togglePopup} pill>
        <HiPencil className="h-5 w-5" />
      </Button>
      <Modal
        size="4xl"
        show={isOpen}
        position="top-center"
        onClose={onClose}
      >
        <Modal.Header>Change Avatar</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col space-y-6 items-center">
            {avatar ? (
              <Avatar
                img={avatar}
                alt={profile.firstName}
                rounded
                size="xl"
              />
            ) : (
              <Avatar rounded size="xl" />
            )}
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={onChange}
              className="hidden"
            />
            <div className="mt-8 flex items-center space-x-8 md:space-x-10">
              {avatar !== profile.avatar ? (
                <Button
                  color="failure"
                  onClick={() => {
                    setAvatar(profile.avatar);
                    setImage(null);
                  }}
                >
                  <HiRefresh className="ml-2 h-5 w-5" /> Reset
                </Button>
              ) : null}
              <Button
                gradientDuoTone="purpleToBlue"
                onClick={() => {
                  imageRef.current?.click();
                }}
              >
                <HiUpload className="ml-2 h-5 w-5" /> Upload
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" type="button" onClick={onClose}>
            <HiX className="mr-2 h-5 w-5" />
            Cancel
          </Button>
          <Button
            gradientDuoTone="cyanToBlue"
            type="submit"
            disabled={isUpdating}
            onClick={updateUserProfile}
          >
            Save
            {isUpdating ? (
              <Spinner color="success" size="sm" className="ml-2" />
            ) : (
              <HiCheck className="ml-2 h-5 w-5" />
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeAvatar;
