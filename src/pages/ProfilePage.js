import { useEffect } from 'react';
import UserProfile from '../components/Profile/UserProfile'
import { titleChangeHandler } from '../utilities/titleChange';

const ProfilePage = () => {
  useEffect(()=>{
    titleChangeHandler("User Profile - Name")
  },[])
  return <UserProfile />
};

export default ProfilePage;
