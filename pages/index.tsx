import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button } from 'react-bootstrap'
import GeneralLayout from '../components/layouts/generalLayout'
import { useAppDispatch } from '../lib/hooks/useAppDispatch'
import { useLoginMutation } from '../store/features/auth/authApiSlice'
import { setCredentials } from '../store/features/auth/authSlice'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()
  const handleLogin = async () => {
    try {
      const userData = await login({ email: 'tahmid.tee10@gmail.com', password: '1234567890a' }).unwrap()
      dispatch(setCredentials({ ...userData }))
      router.push('/welcome')
    } catch (error) {
      // do error handling here
    }

  }
  return (
    <>
      <Button
        type="submit"
        variant="primary"
        className="w-100 fw-bold"
        disabled={isLoading}
        onClick={handleLogin}
      >
        Login
      </Button>
    </>
  )
}

export default Home
