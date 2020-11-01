import React, { useState, useMemo } from 'react';
import { createEditor, Node, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { serialize, EMPTY_EDITOR } from '../utils/slate';
import './InputBar.scss';

type InputBarProps = {
  onChange: (value: string) => void;
  ready: boolean;
}

export default function InputBar(props: InputBarProps) {
  const { onChange, ready } = props;
  
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), []);

  // `value` tracks slate editor value
  const [value, setValue] = useState<Node[]>(EMPTY_EDITOR);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue: Node[]) => {
        setValue(newValue);
      }}
    >
      <Editable
        autoFocus
        className={`InputBar ${ready ? 'InputBar--ready' : 'InputBar--not-ready'}`}
        onAnimationEnd={(e) => {
          // Focus when we first render
          Transforms.select(editor, [0, 0]);
        }}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            // Don't insert a newline
            e.preventDefault();
            onChange(serialize(editor.children));
            Transforms.removeNodes(editor, { match: () => true });
            Transforms.select(editor, [0, 0]);
            setValue(EMPTY_EDITOR);
          }
        }}
        placeholder={"Say hello!"}
      />
    </Slate>
  );

  // return (
  //   <input
  //     ref={inputRef}
  //     className={`InputBar ${ready ? 'InputBar--ready' : 'InputBar--not-ready'}`}
  //     type="text"
  //     onChange={(e) => {
  //       const newValue = e.target.value;
  //       setValue(newValue);
  //     }}

  //     value={value}
  //     onAnimationEnd={() => {
  //       if (inputRef && inputRef.current) {
  //         inputRef.current.focus();
  //       }
  //     }}
  //   />
    // return (

    // )
  // );
}

