import { useSelector } from "react-redux";
import { selectUserEmail } from "../redux/selectors/selector";

export const useUserEmail = () => useSelector(selectUserEmail);
