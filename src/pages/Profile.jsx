import CoverOne from '../images/cover/cover-01.png';
import userSix from '../images/user/user-0.png';
import { Link } from 'react-router-dom';
import { UserDetails } from '../slices/productSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import Loader from '../components/Loader';

const Profile = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [isLoader , setIsLoader] = useState(false)
console.log(userData)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true)
      const data = await dispatch(UserDetails());
      setUserData(data?.payload?.me);
      setIsLoader(false)
    };

    fetchData();
  }, []);

  if(isLoader){
    return <Loader/>
  }

  return (
    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="relative z-20 h-35 md:h-[50%]">
        <img
          src={CoverOne}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
        />
        <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
          <label
            htmlFor="cover"
            className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90 xsm:px-4"
          >
            <input type="file" name="cover" id="cover" className="sr-only" />
            <span>Edit Cover</span>
          </label>
        </div>
      </div>
      <div className="px-4 pb-6  lg:pb-8 xl:pb-11.5">
        <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div className="relative drop-shadow-2">
            <img src={userSix} alt="profile" className="dark:invert" />
            <label
              htmlFor="profile"
              className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
            >
              <span><FiEdit/></span>
              <input
                type="file"
                name="profile"
                id="profile"
                className="sr-only"
              />
            </label>
          </div>
        </div>
        <div className="mt-4  ">
        <div className='flex justify-center'>
          <div>
          <h3 className="mb-4 text-center text-2xl font-semibold text-black dark:text-white">
            {userData?.shopName || 'Shop Name'}
          </h3>
          <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
            Owned by: {userData?.owner || 'Owner Name'}
          </p>
          <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
            Phone: {userData?.phoneNumber || 'Phone Number'}
          </p>
          <p className="mb-2 text-lg text-gray-600 dark:text-gray-400">
            Email: {userData?.email || 'Email Address'}
          </p>
          <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
            Organization: {userData?.additionalFields?.organization || 'Organization'}
          </p>
          </div>
          </div>
          <div className='mt-5 flex justify-evenly border p-5 rounded-lg'>
          <div className="text-left px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
              Address:
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {userData?.additionalFields?.addressLine1 || 'Address Line 1'}, {userData?.additionalFields?.addressLine2 || 'Address Line 2'}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {userData?.additionalFields?.city || 'City'}, {userData?.additionalFields?.province || 'Province'} - {userData?.additionalFields?.postalCode || 'Postal Code'}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Country: {userData?.additionalFields?.countryCode || 'Country'}
            </p>
            <a
              href={userData?.additionalFields?.googleMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View on Google Maps
            </a>
          </div>
          <div className="mt-4 text-left px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            <p className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
              Additional Information:
            </p>
            <p className="text-gray-600 dark:text-gray-400">Aadhar No: {userData?.additionalFields?.aadharNo || 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400">GST No: {userData?.additionalFields?.gstNo || 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400">PAN No: {userData?.additionalFields?.panNo || 'N/A'}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
