import { useSelector } from "react-redux";
import { selectUserId } from "../redux/selectors/selector";

export const useUserId = () => useSelector(selectUserId);
