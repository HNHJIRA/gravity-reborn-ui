import React, { useState } from "react";
import { Stepper, StepperPanel } from "@/components/reui/stepper";
import { SectionWrapper } from "../ui/wrapper/section-wrapper";
import { ContainerWrapper } from "../ui/wrapper/container-wrapper";
import Step1Content from "./steps/step1-content";
import Step2Content from "./steps/step2-content";
import Step3Content from "./steps/step3-content";
import Step4Content from "./steps/step4-content";
import StepFooter from "./steps/step-footer";
import StepNavbar from "./steps/step-navbar";

export default function DesignLabStep() {
  const [step, setStep] = useState(1);
  return (
    <>
      <SectionWrapper>
        <ContainerWrapper>
          <Stepper value={step} onValueChange={setStep} className="space-y-6">
            <StepNavbar step={step} />
            <StepperPanel>
              <Step1Content />
              <Step2Content />
              <Step3Content />
              <Step4Content />
            </StepperPanel>
            <StepFooter step={step} setStep={setStep} />
          </Stepper>
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
}
