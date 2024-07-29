import { IUser } from '../types/user'

interface UserCardProps extends IUser {}
const UserCard = ({ email, name, address, username, phone }: UserCardProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-lg p-4 shadow-md">
      <div className="flex items-center">
        <p className="text-xl font-semibold">
          {name?.firstname} {name?.lastname} ({username})
        </p>
      </div>
      <p className="text-sm text-gray-400">{email}</p>
      <p className="text-base">{phone}</p>
      <div>
        <p className="text-base">{address?.city}</p>
        <p className="text-base">
          {address?.street} {address?.number}
        </p>
        <p className="text-base">
          {address?.city} {address?.zipcode}
        </p>
      </div>
    </div>
  )
}

export default UserCard
