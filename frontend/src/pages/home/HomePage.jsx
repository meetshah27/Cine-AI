import { userAuthStore } from "../../store/AuthUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const {user}=userAuthStore();
  return (
    <div>{user?<HomeScreen/>:<AuthScreen/>}</div>
  )
}

export default HomePage
