import React, { useState, useMemo } from 'react';
import { createEditor, Node, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { serialize, EMPTY_EDITOR } from '../utils/slate';

type SlateWrapperProps = {
  editorClassName?: string;
  readOnly: boolean;
  onChange?: (value: RichText) => void;
  placeholder?: string;
  initialValue?: Node[];
}

export default function SlateWrapper(props: SlateWrapperProps) {
  const { editorClassName, readOnly, onChange, placeholder, initialValue } = props;
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withReact(createEditor()), []);

  // `value` tracks slate editor value
  const [value, setValue] = useState<Node[]>(initialValue ?? EMPTY_EDITOR);

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
        className={editorClassName}
        onAnimationEnd={(e) => {
          // Focus when we first render
          Transforms.select(editor, [0, 0]);
        }}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            // Don't insert a newline
            e.preventDefault();
            if (onChange) {
              onChange(serialize(editor.children));
            }
            Transforms.removeNodes(editor, { match: () => true });
            Transforms.select(editor, [0, 0]);
            setValue(EMPTY_EDITOR);
          }
        }}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </Slate>
  );
}