import {
  StepperItem,
  StepperNav,
  StepperTrigger,
} from "@/components/reui/stepper";
import { Check } from "lucide-react";
import React from "react";

export default function StepNavbar({ step }) {
  return (
    <>
      <StepperNav className="flex justify-center items-center gap-2 max-w-xl mx-auto mb-20">
        {[1, 2, 3, 4].map((num) => (
          <React.Fragment key={num}>
            <StepperItem
              step={num}
              className="relative flex flex-col items-center group"
            >
              <StepperTrigger className="bg-transparent border-none">
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${step >= num && "border-primary text-white"}`}
                >
                  {step > num ? (
                    <Check size={16} />
                  ) : (
                    <span className="text-xs">0{num}</span>
                  )}
                </div>
              </StepperTrigger>
              <span className="absolute -bottom-6 text-[10px] tracking-[0.2em] uppercase group-data-[state=active]:text-gradient-gold">
                {num === 1 ? "Silhouette" : num === 2 ? "Fabric" : num === 3 ? "Embroidery" : "Measurements"}
              </span>
            </StepperItem>
            {num < 4 && <div className="w-full h-px bg-white mx-2" />}
          </React.Fragment>
        ))}
      </StepperNav>
    </>
  );
}
