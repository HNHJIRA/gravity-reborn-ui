import { Upload, Camera, Loader2 } from "lucide-react";
import { HeadingText } from "@/components/ui/text/heading-text";
import { ParagraphText } from "@/components/ui/text/paragraph-text";
import { useRef } from "react";

const UploadCard1 = ({ humanImagePreview, uploadingHuman, onSelectFile }) => {
  const fileInputRef = useRef(null);

  return (
    <>
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 border border-primary rounded-full text-xs text-primary ">
            1
          </span>
          <HeadingText
            title="Upload Your Portrait"
            size="sm"
            className="text-2xl!"
          />
        </div>
        <div 
          className="relative aspect-4/5 border-2 border-dashed border-zinc-800 group hover:border-primary/40 transition-colors flex flex-col items-center justify-center p-8 space-y-2 cursor-pointer overflow-hidden"
          onClick={() => fileInputRef.current?.click()}
        >
          {humanImagePreview ? (
            <>
              <img src={humanImagePreview} alt="Portrait Preview" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              {uploadingHuman && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-10">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                  <span className="text-xs text-primary uppercase tracking-widest font-bold">Uploading...</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary" />
              <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <ParagraphText text="Drag & drop your portrait" size="sm" className="text-center" />
              <ParagraphText
                text="or click to browse · JPG, PNG"
                className="text-xs! text-center"
              />
              <button className="flex items-center gap-3 border border-primary px-6 py-3 text-[10px] uppercase tracking-widest text-primary cursor-pointer mt-2 z-10">
                <Camera className="w-4 h-4" />
                Upload Photo
              </button>
            </>
          )}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={onSelectFile}
          />
        </div>
      </div>
    </>
  );
};

export default UploadCard1;
