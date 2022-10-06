import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { axiosClassic } from "../../api/axios";
import { selectProfile } from "../../store/slices/profile/profile.slice";
import { useActions } from "../store/useActions";
import { useTypedSelector } from "../store/useTypedSelector";

export const useAuth = () => {
  const { profile } = useTypedSelector(selectProfile);
  const { refresh } = useActions();

  useEffect(() => {
    refresh();
  }, []);

  return profile;
};
