import {
    Calendar,
    Mail,
    Phone,
  } from "lucide-react";
  
  import { Profile } from "@/types/profile";
  
  interface Props {
    profile: Profile;
  }
  
  export default function ProfileSidebar({
    profile,
  }: Props) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center">
          <img
            src={
              profile.avatar ||
              "https://i.pravatar.cc/300"
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover"
          />
  
          <h2 className="text-3xl font-bold mt-5 text-gray-900">
          {profile.fullName ?? "-"}
          </h2>
  
          <span className="bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1 rounded-lg mt-3">
            {profile.role || "Administrator"}
          </span>
  
          <div className="space-y-5 mt-8 w-full text-left">
            <div className="flex items-center gap-4 text-gray-700 text-sm">
              <Mail size={18} />
              <span>{profile.email}</span>
            </div>
  
            <div className="flex items-center gap-4 text-gray-700 text-sm">
              <Phone size={18} />
              <span>{profile?.phone ?? "Not set"}</span>
            </div>
  
            <div className="flex items-center gap-4 text-gray-700 text-sm">
              <Calendar size={18} />
              <span>
                Member since May 20, 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }