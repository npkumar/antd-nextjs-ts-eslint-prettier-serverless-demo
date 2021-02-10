import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'

const Profile = () => {
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      // if there is no authenticated user, redirect to profile page
      .catch(() => {
        router.push('/')
        setUser(null)
      })
  }, [])

  return <div>{user && <h1>Welcome, {user.username}</h1>}</div>
}

export default Profile
