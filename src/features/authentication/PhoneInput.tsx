import React, { LegacyRef, ReactElement, forwardRef } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const PhoneInput = forwardRef(
  (
    { disabled }: { disabled: boolean },
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    return (
      <InputOTP
        ref={ref} // Attach the forwarded ref to the InputOTP component
        className=" "
        disabled={disabled}
        aria-label="phone number"
        maxLength={11}
      >
        <div className=" hidden xs:flex w-full  items-center justify-center">
          <InputOTPGroup className=" justify-end phone-input-fields-width-two">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup className=" phone-input-fields-width justify-center">
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup className=" phone-input-fields-width">
            <InputOTPSlot index={7} />
            <InputOTPSlot index={8} />
            <InputOTPSlot index={9} />
            <InputOTPSlot index={10} />
          </InputOTPGroup>
        </div>
        <div className=" xs:hidden     w-full  items-center">
          <InputOTPGroup className="divide-width-type ">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
            <InputOTPSlot index={8} />
            <InputOTPSlot index={9} />
            <InputOTPSlot index={10} />
          </InputOTPGroup>
        </div>
      </InputOTP>
    );
  }
);

export default PhoneInput;
