import { useRecoilValue } from "recoil"
import { userEmailState } from "../selectors/userEmail"
import { Navigate } from "react-router-dom"

interface IPrivateRouteProps{
    children: React.ReactElement
}

const PrivateRoute = (props:IPrivateRouteProps) => {
  const {children} = props
  const userEmail = useRecoilValue(userEmailState)
  console.log(userEmail)
  return (
    userEmail || localStorage.getItem("token") ? children : <Navigate to={"/signin"} />
  )
}

export default PrivateRoute