"use client";
import { Input } from "@worldcoin/mini-apps-ui-kit-react";
import { Shield } from "lucide-react";
import { Typography } from "@worldcoin/mini-apps-ui-kit-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ListItem } from "@worldcoin/mini-apps-ui-kit-react";
import { ChevronDown } from "lucide-react";
import { Select } from "@worldcoin/mini-apps-ui-kit-react"

// // This would come from environment variables in a real app
// const APP_ID =
//   process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID ||
//   "app_9a73963d73efdf2e7d9472593dc9dffd";

export default function Page() {
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const ageOptions = Array.from({ length: 13}, (_, i) => ({
    label: `${i + 18}`,
    value: `${i + 18}`,
}));
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState(null);
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say']


  return (
    <div className="flex flex-col h-[100dvh] bg-white safe-area-inset">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        <h1 className="text-5xl font-bold text-black-600">Realove</h1>

        <Typography
          level={2}
          variant="subtitle"
        >
            The first dating app with only real human.
        </Typography>

        <Input
          placeholder="Username"
          startAdornment={<Shield />}
          startAdornmentWidth={1.5}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        <Select
          onChange={(selectedOption) => {
            setAge(selectedOption?.value || '');
          }}
          placeholder="Please Confirm Your Age"
          value={ageOptions.find(option => option.value === age)}
          options = {ageOptions}
        />

        <Select
          onChange={(selectedOption) => {
            setGender(selectedOption?.value || '');
          }}
          placeholder="Select your gender"
          value={genderOptions.find(option => option.value === gender)}
          options={genderOptions.map(option => ({
            label: option,
            value: option,
          }))}
        />

    <div className="relative w-full">
  <div
    onClick={() => setIsOpen((prev) => !prev)}
    className={`flex items-center justify-between px-4 py-3 rounded-xl font-mono text-base bg-gray-100 transition-all duration-200
      ${isOpen ? 'border-2 border-black ring-2 ring-black-600' : 'border-none'}
      cursor-pointer`}
  >
    <div className="flex items-center gap-2 text-gray-700">
      <Shield className="w-5 h-5 text-gray-500" />
      <span className={gender ? "text-black" : "text-gray-400"}>
        {gender || "Select your gender"}
      </span>
    </div>
    <ChevronDown className="w-4 h-4 text-gray-500" />
  </div>

  {isOpen && (
    <div className="absolute z-10 mt-2 w-full bg-gray border border-gray-200 rounded-xl shadow-md">
      {genderOptions.map((option) => (
        <div
          key={option}
          onClick={() => {
            setGender(option);
            setIsOpen(false);
          }}
          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer 
            ${gender === option ? 'bg-gray-100 font-semibold' : ''}`}
        >
          {option}
        </div>
      ))}
    </div>
  )}
</div>

      </div>
    </div>
  );
}
