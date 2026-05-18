interface Props {
    title: string;
  }
  
  export default function PermissionCard({
    title,
  }: Props) {
    return (
      <div className="border border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:shadow-sm transition-all">
        <h4 className="text-sm font-semibold text-gray-800">
          {title}
        </h4>
  
        <span className="mt-3 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-lg font-medium">
          Access
        </span>
      </div>
    );
  }