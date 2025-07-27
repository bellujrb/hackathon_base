import { useNotification } from "@coinbase/onchainkit/minikit";
import { Transaction, TransactionButton, TransactionError, TransactionResponse, TransactionStatus, TransactionStatusAction, TransactionStatusLabel, TransactionToast, TransactionToastAction, TransactionToastIcon, TransactionToastLabel } from "@coinbase/onchainkit/transaction";
import { useCallback, useMemo } from "react";
import { useAccount } from "wagmi";
import { Card } from "../../components/card";

export function TransactionCard() {
    const { address } = useAccount();
  
    // Example transaction call - sending 0 ETH to self
    const calls = useMemo(() => address
      ? [
          {
            to: address,
            data: "0x" as `0x${string}`,
            value: BigInt(0),
          },
        ]
      : [], [address]);
  
    const sendNotification = useNotification();
  
    const handleSuccess = useCallback(async (response: TransactionResponse) => {
      const transactionHash = response.transactionReceipts[0].transactionHash;
  
      console.log(`Transaction successful: ${transactionHash}`);
  
      await sendNotification({
        title: "Congratulations!",
        body: `You sent your a transaction, ${transactionHash}!`,
      });
    }, [sendNotification]);
  
    return (
      <Card title="Make Your First Transaction">
        <div className="space-y-4">
          <p className="text-[var(--app-foreground-muted)] mb-4">
            Experience the power of seamless sponsored transactions with{" "}
            <a
              href="https://onchainkit.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0052FF] hover:underline"
            >
              OnchainKit
            </a>
            .
          </p>
  
          <div className="flex flex-col items-center">
            {address ? (
              <Transaction
                calls={calls}
                onSuccess={handleSuccess}
                onError={(error: TransactionError) =>
                  console.error("Transaction failed:", error)
                }
              >
                <TransactionButton className="text-white text-md" />
                <TransactionStatus>
                  <TransactionStatusAction />
                  <TransactionStatusLabel />
                </TransactionStatus>
                <TransactionToast className="mb-4">
                  <TransactionToastIcon />
                  <TransactionToastLabel />
                  <TransactionToastAction />
                </TransactionToast>
              </Transaction>
            ) : (
              <p className="text-yellow-400 text-sm text-center mt-2">
                Connect your wallet to send a transaction
              </p>
            )}
          </div>
        </div>
      </Card>
    );
  }
  