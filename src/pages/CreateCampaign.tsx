import type { NextPage } from "next";
import { ethers } from "ethers";

import money from "../../public/assets/money.svg";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { checkIfImage } from "../utils";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { useStateContext } from "../context";
import Navbar from "../components/Navbar";

interface FormState {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}
const CreateCampaign: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState<FormState>({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (
    fieldName: keyof FormState,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists: any) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        router.push("/");
      } else alert("Provide a valid image url");
      setForm({ ...form, image: "" });
    });

    console.log(form);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loader... "}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <Navbar />
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a Title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
          inputType={"number"}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <Image
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
          <FormField
            labelName="Campaign Image *"
            placeholder="Place Image URL"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
          <div className="flex justify-center items-center mt-10">
            <CustomButton
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateCampaign;
