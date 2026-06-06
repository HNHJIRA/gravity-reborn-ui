
import React, { useState, useEffect, useRef } from "react";
import { useServerFn } from "@tanstack/react-start";
import { outfits } from "@/mock/virtual-try-data";
import { ContainerWrapper } from "@/components/ui/wrapper/container-wrapper";
import { SectionWrapper } from "@/components/ui/wrapper/section-wrapper";
import { EyebrowText } from "@/components/ui/text/eye-brow-text";
import { HeadingText } from "@/components/ui/text/heading-text";
import { runVirtualTryOn } from "@/lib/tryon.functions";
import UploadCard1 from "./upload-card1";
import UploadCard2 from "./upload-card2";
import UploadCard3 from "./upload-card3";
import UploadCard4 from "./upload-card4";

const urlToDataUrl = async (url) => {
  if (url.startsWith("data:")) return url;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const VirtualTryUpload = () => {
  const tryOnFn = useServerFn(runVirtualTryOn);
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
    const mockGarments = outfits.map((o, idx) => ({
      id: idx + 1,
      title: o.title,
      category: o.sub,
      imageUrl: o.img,
    }));
    setGarments(mockGarments);
  }, []);

  const handleHumanImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setHumanImageFile(file);
    const preview = URL.createObjectURL(file);
    setHumanImagePreview(preview);

    // Read as data URL so we have a portable reference for the try-on call
    setUploadingHuman(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      setHumanImageUrl(dataUrl);
    } catch (err) {
      console.error(err);
      alert("Error reading portrait.");
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
      const garmentDataUrl = await urlToDataUrl(selectedGarment.imageUrl);
      const data = await tryOnFn({
        data: {
          human_image_url: humanImageUrl,
          garment_image_url: garmentDataUrl,
          description: `${selectedGarment.category || ""} ${selectedGarment.title || ""}`.trim(),
        },
      });
      if (data.success) {
        const imageUrl =
          data.data?.image?.url || data.data?.images?.[0]?.url;
        setResultImage(imageUrl);
      } else {
        setError(data.error || "Failed to generate virtual try-on.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.message || "Network error communicating with the AI server.");
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
          <UploadCard4 resultImage={resultImage} />
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
};

export default VirtualTryUpload;
