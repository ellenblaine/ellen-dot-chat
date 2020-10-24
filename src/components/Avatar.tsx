import React from 'react';
import './Avatar.scss';

export type AvatarProps = {
  initials: string;
};

export default function Avatar(props: AvatarProps) {
  const { initials } = props;
  return (
    <div className="Avatar">
      {initials.toUpperCase()}
    </div>
  )
} 