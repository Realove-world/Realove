"use client";
import { Input } from "@worldcoin/mini-apps-ui-kit-react";
import { Shield } from "lucide-react";
import { Typography } from "@worldcoin/mini-apps-ui-kit-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
          value={genderOptions
            .map(option => ({ label: option, value: option }))
            .find(option => option.value === gender)}
          
          options={genderOptions.map(option => ({
            label: option,
            value: option,
          }))}
        />
 

      </div>
    </div>
  );
}
