"use client";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

export default function Page() {
  return (
    <CrossmintPayButton
      clientId="eec00be9-e351-42f6-9f20-8d7e3cc70a65"
      mintConfig={{
        type: "erc-721",
        totalPrice: 0.053,
        quantity: 1,
      }}
      environment="staging"
    />
  );
}
