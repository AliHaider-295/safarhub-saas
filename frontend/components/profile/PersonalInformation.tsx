interface Props {
  profile: any;
}

const Item = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">
        {label}
      </p>

      <h4 className="text-[15px] font-medium text-gray-800">
        {value}
      </h4>
    </div>
  );
};

export default function PersonalInformation({
  profile,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
        <Item
          label="Full Name"
          value={profile?.fullName ?? "-"}
        />

        <Item
          label="Role"
          value={
            profile?.role ||
            "Administrator"
          }
        />

        <Item
          label="Email"
          value={profile?.email || "-"}
        />

        <Item
          label="Department"
          value="Management"
        />

        <Item
          label="Phone"
          value={profile?.phone || "Not set"}
        />

        <Item
          label="Address"
          value={profile?.address || "Not set"}
        />

        <Item
          label="Date Of Birth"
          value="15 April 1995"
        />

        <Item
          label="Joined On"
          value="20 May 2024"
        />

        <Item
          label="Gender"
          value="Male"
        />

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Status
          </p>

          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-lg text-sm font-medium">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}