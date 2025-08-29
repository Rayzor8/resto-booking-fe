"use client";

import { useState } from "react";
import type {
  BookingStepOne as StepOneData,
  BookingStepTwo as StepTwoData,
  BookingStepThree as StepThreeData,
} from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookingStepOne } from "@/components/booking/step-one";

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);
  const [stepTwoData, setStepTwoData] = useState<StepTwoData | null>(null);
  const [stepThreeData, setStepThreeData] = useState<StepThreeData | null>(
    null
  );

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleStepOneComplete = (data: StepOneData) => {
    setStepOneData(data);
    setCurrentStep(2);
  };

  const handleStepTwoComplete = (data: StepTwoData) => {
    setStepTwoData(data);
    setCurrentStep(3);
  };

  const handleStepThreeComplete = (data: StepThreeData) => {
    setStepThreeData(data);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Select Date & Seating";
      case 2:
        return "Choose Time & Guests";
      case 3:
        return "Contact Information";
      default:
        return "Book a Table";
    }
  };

  return (
    <div className="bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Book Your Table
          </h1>
          <p className="text-muted-foreground">
            Reserve your perfect dining experience at Bella Vista
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <BookingStepOne
                onComplete={handleStepOneComplete}
                initialData={stepOneData}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
