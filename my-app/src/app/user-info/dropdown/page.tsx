"use client";

import { Select } from "@worldcoin/mini-apps-ui-kit-react";
import { useState } from "react";

export default function Page() {
  const [age, setAge] = useState('');

  const ageOptions = Array.from({ length: 13 }, (_, i) => ({
    label: `${i + 18}`,
    value: `${i + 18}`,
  }));

  
  return (
    <div className="p-4">
      <div className="w-1/3">
      <Select
        onChange={(selectedOption) => {
          setAge(selectedOption?.value || '');
        }}
        placeholder="Please Confirm Your Age"
        value={ageOptions.find(option => option.value === age)}
        options={ageOptions}
      />

        </div>
    </div>
  );
}
