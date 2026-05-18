"use client";

import { useEffect, useState } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import PersonalInformation from "@/components/profile/PersonalInformation";
import AccountSecurity from "@/components/profile/AccountSecurity";
import ActivitySummary from "@/components/profile/ActivitySummary";
import RecentActivity from "@/components/profile/RecentActivity";
import PermissionsOverview from "@/components/profile/PermissionsOverview";
import EditProfileModal from "@/components/profile/EditProfileModal";

import { getProfile, updateProfile } from "@/lib/api";
import { Profile } from "@/types/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  // =============================
  // FETCH PROFILE
  // =============================
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // =============================
  // UPDATE PROFILE
  // =============================
  const handleUpdateProfile = async (formData: Partial<Profile>) => {
    try {
      const res = await updateProfile(formData);
  
      // IMPORTANT: backend returns { success, message, data }
      const updatedUser = res.data;
  
      setProfile(updatedUser); // ✅ correct update
  
      setOpenEdit(false);
    } catch (error) {
      console.error("Update profile failed:", error);
    }
  };
  // =============================
  // STATES
  // =============================
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!profile) {
    return <div className="p-6">Failed to load profile</div>;
  }

  // =============================
  // UI
  // =============================
  return (
    <div className="p-4 md:p-6 bg-[#f5f7fb] min-h-screen">
      <ProfileHeader />

      {/* Edit Button */}
      <button onClick={() => setOpenEdit(true)}>
        Edit Profile
      </button>

      <EditProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        profile={profile}
        onSubmit={handleUpdateProfile}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <ProfileSidebar profile={profile} />

        <div className="lg:col-span-2">
          <PersonalInformation profile={profile} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <AccountSecurity />
        <ActivitySummary />
        <RecentActivity />
      </div>

      <div className="mt-5">
        <PermissionsOverview />
      </div>
    </div>
  );
}