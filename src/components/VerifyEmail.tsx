"use client";

import Image from "next/image";
import { XCircle } from "lucide-react";
import { trpc } from "@/trpc/client";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (false) {
    //something went wrong with token verification
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w08 text-red-600" />
        <h3 className="font-semibold text-xl">There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          This token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (true) {
    <div className="flex h-full flex-col items-center justify-center">
      <div className="relative mb-4 h-60 w-60 text-muted-foreground">
        <Image
          src="/public/hippo-email-sent.png"
          fill
          alt="the email was sent"
        />
      </div>
      <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
    </div>;
  }
};

export default VerifyEmail;
