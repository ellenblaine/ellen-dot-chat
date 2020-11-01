import { Node, Editor } from 'slate';

// Basic serialization to plain text
export function serialize(nodes: Node[]): string {
  return nodes.map(node => {
    return Node.string(node)
  }).join('\n');
}

export const EMPTY_EDITOR: Node[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export function isEmpty(editor: Editor): boolean {
  return serialize(editor.children) === '';
}