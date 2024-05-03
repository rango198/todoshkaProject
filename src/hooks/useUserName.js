import { useSelector } from "react-redux";
import { selectUserName } from "../redux/selectors/selector";

export const useUserName = () => useSelector(selectUserName);
