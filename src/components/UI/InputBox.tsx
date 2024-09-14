import React from 'react';

interface InputBoxProps {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ placeholder, name, value, onChange, isTextarea }) => {
  return (
    <div>
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full py-3 px-4 rounded-lg resize-none text-white bg-transparent border border-[#414141] placeholder-white focus:outline-none focus:border-[#d2ff1c] focus:border-2"
        />
      ) : (
        <input
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full py-3 px-4 rounded-lg text-white bg-transparent border border-[#414141] placeholder-white focus:outline-none focus:border-[#d2ff1c] focus:border-2"
        />
      )}
    </div>
  );
};

export default InputBox;
