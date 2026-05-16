import React from 'react';

const UserAvatar = ({ className }) => {
  return (
    <img 
      src="/avatar.png" 
      alt="User Avatar" 
      className={`object-cover ${className}`}
      onError={(e) => {
        e.target.src = "https://ui-avatars.com/api/?name=Commander&background=22c55e&color=fff";
      }}
    />
  );
};

export default UserAvatar;
