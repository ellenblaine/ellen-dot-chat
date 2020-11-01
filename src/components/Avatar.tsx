import React from 'react';
import './Avatar.scss';

export type AvatarProps = {
  imageUrl?: string;
  initials: string;
};

export default function Avatar(props: AvatarProps) {
  const { imageUrl, initials } = props;
  return (
    <div className="Avatar">
      {
        imageUrl ?
        <img className="Avatar__image" src={imageUrl} alt="user_photo" />  
        : initials.toUpperCase()
      }
    </div>
  )
} 