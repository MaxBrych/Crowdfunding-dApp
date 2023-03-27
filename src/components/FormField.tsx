import { ethers } from "ethers";
import type { NextPage } from "next";
import { ChangeEvent } from "react";
type InputType =
  | "number"
  | "text"
  | "email"
  | "password"
  | "date"
  | "url"
  | "file";

interface FormFieldProps {
  labelName?: string;
  placeholder?: string;
  inputType?: InputType;
  isTextArea?: boolean;
  value: string | number | ethers.BigNumber;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  const valueString = typeof value === "object" ? value.toString() : value;

  return (
    <label className="flex flex-col flex-1 w-full">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={valueString}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={valueString}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};
export default FormField;
