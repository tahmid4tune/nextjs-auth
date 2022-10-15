import { NextPage } from "next";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import ProtectedLayout from "../components/layouts/protectedLayout";
import { useAppDispatch } from "../lib/hooks/useAppDispatch";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { User } from "../models/user";
import { logout } from "../store/features/auth/authSlice";
import { useGetUsersQuery } from "../store/features/users/usersApiSlice";

const Welcome: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery()

  const handleLogout = () => {
    router.push('/')
    dispatch(logout())
  }

  return <ProtectedLayout>
    Welcome {user?.name}

    List of all users:
    {isLoading && <p>Loading users... </p>}
    {
      isSuccess && users && users.map((user: User) => <p key={user.id}>{user.name}</p>)
    }
    <Button
      type="submit"
      variant="primary"
      className="w-100 fw-bold"
      onClick={handleLogout}
    >
      Logout
    </Button>
  </ProtectedLayout>
}


export default Welcome