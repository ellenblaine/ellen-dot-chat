import React, { useState, useRef } from 'react';
import './InputBar.scss';

type InputBarProps = {
  initialValue?: string;
  onChange: (value: string) => void;
  ready: boolean;
}

export default function InputBar(props: InputBarProps) {
  const { initialValue, onChange, ready } = props;
  const [value, setValue] = useState(initialValue || '');
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={inputRef}
      className={`InputBar ${ready ? 'InputBar--ready' : 'InputBar--not-ready'}`}
      type="text"
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
      }}
      onKeyDown={(e: any) => {
        if (e.key === 'Enter') {
          const newValue = e.target.value;
          if (newValue !== '') {
            onChange(newValue);
          }
          setValue('');
        }
      }}
      placeholder={"Say hello!"}
      value={value}
      onAnimationEnd={() => {
        if (inputRef && inputRef.current) {
          inputRef.current.focus();
        }
      }}
    />
  );
}

