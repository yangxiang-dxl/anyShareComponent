import React,{useState} from 'react'
interface Profile {
    firstName:string
    lastName:string
    title:string
}

interface ProfileState{
    profile:Profile
    setProfile:React.Dispatch<React.SetStateAction<Profile>>
}
const useProfile = (overrides?:Partial<Profile>):ProfileState =>{
    const defaultProfile:Profile = {
        firstName: "Foo",
        lastName: "Bar",
        title: "Software developer"
    }
    const [profile,setProfile] = useState<Profile>({
        ...defaultProfile,
        ...overrides
    })
    return {profile,setProfile}
}
const ProfilePage =()=> {
    const [profile] = useState<Profile>({
        firstName: "Foo",
        lastName: "Bar",
        title: "Software developer",
    })
    return (
        <dl>
        <dt>First name:</dt> <dd>{profile.firstName}</dd>
        <dt>Last name:</dt> <dd>{profile.lastName}</dd>
        <dt>Title:</dt> <dd>{profile.title}</dd>
      </dl>
    )
}

export default ProfilePage