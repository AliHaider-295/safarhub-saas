import { useEffect, useState } from "react";
import { getProfile } from "@/lib/api";

export const useProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const data = await getProfile();
    setProfile(data);
  };

  return { profile, fetchProfile };
};