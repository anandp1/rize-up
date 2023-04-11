import { Customer } from "../../../interfaces/interface";

interface MemberInfoProps {
  memberInfo: Customer;
}

const MemberInfo: React.FC<MemberInfoProps> = ({
  memberInfo,
}: MemberInfoProps) => {
  return (
    <div className="flex">
      <div className="bg-white rounded-lg flex flex-col px-6 py-8 max-w-lg mx-auto">
        <div className="text-3xl font-bold mb-8 text-center">Your Account</div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Name</p>
            <p className="text-gray-700">
              {memberInfo.firstName} {memberInfo.lastName}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Date of Birth</p>
            <p className="text-gray-700">{memberInfo.birthDate}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Age</p>
            <p className="text-gray-700">{memberInfo.age}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Gender</p>
            <p className="text-gray-700">{memberInfo.gender}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Date Joined</p>
            <p className="text-gray-700">{memberInfo.dateJoined}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-semibold mb-1">Membership Type</p>
            <p className="text-gray-700">{memberInfo.membershipName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
