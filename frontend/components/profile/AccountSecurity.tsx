import {
    Lock,
    Monitor,
    ShieldCheck,
  } from "lucide-react";
  
  export default function AccountSecurity() {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Account Security
        </h2>
  
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-5">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Lock size={20} />
              </div>
  
              <div>
                <h4 className="text-sm font-semibold">
                  Password
                </h4>
                <p className="text-xs text-gray-500">
                  ***************
                </p>
              </div>
            </div>
  
            <button className="text-blue-600 text-sm font-medium">
              Change Password
            </button>
          </div>
  
          <div className="flex items-center justify-between border-b pb-5">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Monitor size={20} />
              </div>
  
              <div>
                <h4 className="text-sm font-semibold">
                  Logged In Devices
                </h4>
                <p className="text-xs text-gray-500">
                  2 active devices
                </p>
              </div>
            </div>
  
            <button className="text-blue-600 text-sm font-medium">
              View Devices
            </button>
          </div>
  
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-50 p-3 rounded-xl">
                <ShieldCheck size={20} />
              </div>
  
              <div>
                <h4 className="text-sm font-semibold">
                  Two-Factor Authentication
                </h4>
                <p className="text-xs text-gray-500">
                  Not Enabled
                </p>
              </div>
            </div>
  
            <button className="text-blue-600 text-sm font-medium">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    );
  }