"use client";

import React, { useState, useEffect, useRef } from "react";
import { ContainerWrapper } from "@/components/ui/wrapper/container-wrapper";
import { SectionWrapper } from "@/components/ui/wrapper/section-wrapper";
import { EyebrowText } from "@/components/ui/text/eye-brow-text";
import { HeadingText } from "@/components/ui/text/heading-text";
import UploadCard1 from "./upload-card1";
import UploadCard2 from "./upload-card2";
import UploadCard3 from "./upload-card3";

const VirtualTryUpload = () => {
  const [humanImageFile, setHumanImageFile] = useState(null);
  const [humanImagePreview, setHumanImagePreview] = useState(null);
  const [humanImageUrl, setHumanImageUrl] = useState(null);
  const [uploadingHuman, setUploadingHuman] = useState(false);

  const [garments, setGarments] = useState([]);
  const [selectedGarment, setSelectedGarment] = useState(null);

  const [resultImage, setResultImage] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch garments from backend
    const fetchGarments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/virtual-try-outfit");
        if (res.ok) {
          const data = await res.json();
          setGarments(data.data || []);
        }
      } catch (err) {
        console.error("Failed to load garments", err);
      }
    };
    fetchGarments();
  }, []);

  const handleHumanImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHumanImageFile(file);
    setHumanImagePreview(URL.createObjectURL(file));

    // Upload to backend to get public URL
    setUploadingHuman(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setHumanImageUrl(data.imageUrl);
      } else {
        alert("Failed to upload portrait.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading portrait.");
    } finally {
      setUploadingHuman(false);
    }
  };

  const handleTryOn = async () => {
    if (!humanImageUrl) {
      alert("Please upload your portrait first (wait for it to finish uploading).");
      return;
    }
    if (!selectedGarment) {
      alert("Please select a garment.");
      return;
    }

    setGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      const res = await fetch("http://localhost:5000/api/fal/try-on", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          human_image_url: humanImageUrl,
          garment_image_url: selectedGarment.imageUrl,
          description: `${selectedGarment.category || ""} ${selectedGarment.title || ""}`.trim()
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Support both IDM-VTON (data.image.url) and FASHN-VTON (data.images[0].url)
        const imageUrl = data.data.image?.url || data.data.images?.[0]?.url;
        setResultImage(imageUrl);
      } else {
        setError(data.error || "Failed to generate virtual try-on.");
      }
    } catch (err) {
      setError("Network error communicating with the AI server.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <SectionWrapper>
        <ContainerWrapper className="space-y-10">
          <div className="text-center space-y-2">
            <EyebrowText
              text="Experience the Difference"
              className="text-white"
              align="center"
            />
            <HeadingText
              title="Your"
              highlight="Transformation Awaits"
              align="center"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <UploadCard1 
              humanImagePreview={humanImagePreview}
              uploadingHuman={uploadingHuman}
              onSelectFile={handleHumanImageSelect}
            />
            <UploadCard2 
              garments={garments}
              selectedGarment={selectedGarment}
              onSelectGarment={setSelectedGarment}
            />
            <UploadCard3 
              resultImage={resultImage}
              generating={generating}
              error={error}
              onTryOn={handleTryOn}
              canTryOn={!!humanImageUrl && !!selectedGarment}
            />
          </div>
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
};

export default VirtualTryUpload;
