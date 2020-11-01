import { Node, Editor } from 'slate';

// Basic serialization to plain text
export function serialize(nodes: Node[]): string {
  return nodes.map(node => {
    return Node.string(node)
  }).join('\n');
}

// Basic deserialization from plain text
export function deserialize(text: RichText): Node[] {
  return [
    {
      type: 'paragraph',
      children: [{ text }],
    },
  ];
}

export const EMPTY_EDITOR: Node[] = deserialize('');

export function isEmpty(editor: Editor): boolean {
  return serialize(editor.children) === '';
}