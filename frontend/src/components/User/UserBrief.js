const UserBrief = (props) => {
  return (
    <div className={`${props.className} flex items-center`}>
      <img
        className="w-16 h-16 rounded-full object-cover mr-2"
        src={props.user.avatar.publicUrl}
        alt={props.user.name}
      />
      <div>
        <h3 className="text-lg font-medium">{props.user.name}</h3>
        <span className="text-base text-gray-500">
          На SwapSpot з {new Date(props.user.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default UserBrief;
