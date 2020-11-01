import React from 'react';
import './InputBar.scss';
import SlateWrapper from './SlateWrapper';

type InputBarProps = {
  onChange: (value: string) => void;
  ready: boolean;
}

export default function InputBar(props: InputBarProps) {
  const { onChange, ready } = props;
  
  return (
    <SlateWrapper
      editorClassName={`InputBar ${ready ? 'InputBar--ready' : 'InputBar--not-ready'}`}
      readOnly={false}
      onChange={onChange}
      placeholder={'Say hello!'}
    />
  )
}

