import { useSelector } from "react-redux";
import { selectUserAvatar } from "../redux/selectors/selector";

export const useUserAvatar = () => useSelector(selectUserAvatar);
