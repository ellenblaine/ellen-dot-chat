import React, {useState, useEffect} from 'react';
import './MultipleChoiceMessage.scss';

type MultipleChoiceMessageProps = {
  options: MessageOption[];
}

export default function MultipleChoiceMessage(props: MultipleChoiceMessageProps) {
  const { options } = props;
  const [displayOptions, setDisplayOptions] = useState<number[]>([]);
  useEffect(() => {
    const timeoutIds = options.map((_, index) => {
      return setTimeout(() => {
        if (!displayOptions.includes(index)) {
          setDisplayOptions([...displayOptions, index]);
        }
      }, (index + 1) * 100);
    });
    return () => timeoutIds.forEach(id => clearTimeout(id));
  }, [displayOptions, setDisplayOptions, options])
  return (
    <div className="MultipleChoiceMessage">
      {
        options.map((option, index) => {
          const hidden = displayOptions.includes(index) ? '' : 'MultipleChoiceMessage__option--hidden';
          return (
            <div
              className={`MultipleChoiceMessage__option ${hidden}`}
              key={option.text}
              onClick={() => option.onClick()}
            >
              {option.text}
            </div>
          )
        })
      }
    </div>
  )
}