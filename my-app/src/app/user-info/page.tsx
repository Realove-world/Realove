"use client";

import { useState, useEffect } from "react";
import { Input, Select, Typography, Button } from "@worldcoin/mini-apps-ui-kit-react";
import "@worldcoin/mini-apps-ui-kit-react/styles.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const [world_username, setWorldUsername] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const ageOptions = Array.from({ length: 53 }, (_, i) => ({
    label: `${i + 18}`,
    value: `${i + 18}`,
  }));

  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Prefer not to say",
  ].map((option) => ({
    label: option,
    value: option,
  }));

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get username from URL
    const params = new URLSearchParams(window.location.search);
    const urlUsername = params.get('username');
    console.log("Raw URL:", window.location.href);
    console.log("URL username param:", urlUsername);
    
    if (urlUsername) {
      const decodedUsername = decodeURIComponent(urlUsername);
      console.log("Decoded username:", decodedUsername);
      setWorldUsername(decodedUsername);
      console.log("Setting world_username to:", decodedUsername);
    } else {
      console.log("No username found in URL params");
    }
  }, []); // Run only once on component mount

  // Add a new useEffect to monitor world_username changes
  useEffect(() => {
    console.log("world_username state changed to:", world_username);
  }, [world_username]);

  // Add a new useEffect to monitor searchParams changes
  useEffect(() => {
    console.log("searchParams changed:", Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-white safe-area-inset">

          {/* Background Image */}
    <img
      src="/user-info-2.png"
      alt="Background"
      className="absolute top-0 left-0 w-full h-full object-cover opacity-15 pointer-events-none"
    />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        <Typography level={1} 
        className="text-6xl"
        variant="heading">
          Realove 💖
        </Typography>

        <Typography level={1} 
        className="text-2xl"
        variant="subtitle">
          Let's find your soulmate! {world_username}
        </Typography>

        <Input
          placeholder="Username"
          startAdornmentWidth={1.5}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Select
          onChange={(selectedOption) => setAge(selectedOption?.value || "")}
          placeholder="Select your age"
          value={ageOptions.find((option) => option.value === age)}
          options={ageOptions}
        />

        <Select
          onChange={(selectedOption) => setGender(selectedOption?.value || "")}
          placeholder="Select your gender"
          value={genderOptions.find((option) => option.value === gender)}
          options={genderOptions}
        />

        <label className="w-40 h-40 flex flex-col items-center justify-center bg-gray-100 text-gray-400 border border-dashed border-gray-300 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-200 transition">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <span className="text-sm">Best photo of you</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <Button
          onClick={function Ki(){}}
          radius="md"
          size="lg"
          variant="secondary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
