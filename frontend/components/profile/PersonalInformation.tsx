interface Props {
  profile: any;
}

const Item = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">{label}</p>

      <h4 className="text-[15px] font-medium text-gray-800">
        {value || "Not set"}
      </h4>
    </div>
  );
};

// ✅ DATE FORMATTER
const formatDate = (date?: string) => {
  if (!date) return "Not set";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function PersonalInformation({ profile }: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">

        <Item label="Full Name" value={profile?.fullName} />

        <Item label="Role" value={profile?.role} />

        <Item label="Email" value={profile?.email} />

        {/* ✅ NOW DYNAMIC */}
        <Item label="Department" value={profile?.department} />

        <Item label="Phone" value={profile?.phone} />

        <Item label="Address" value={profile?.address} />

        {/* ✅ DATE OF BIRTH */}
        <Item
          label="Date Of Birth"
          value={formatDate(profile?.dateOfBirth)}
        />

        {/* ✅ JOINED DATE */}
        <Item
          label="Joined On"
          value={formatDate(profile?.joinedAt)}
        />

        {/* ✅ GENDER */}
        <Item label="Gender" value={profile?.gender} />

        {/* ✅ STATUS */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Status</p>

          <span
            className={`px-4 py-1 rounded-lg text-sm font-medium ${
              profile?.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {profile?.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
}