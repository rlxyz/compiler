import { ethers } from "ethers";

export const provider = new ethers.providers.JsonRpcProvider(
  process.env.ETH_JSON_RPC_PROVIDER
);

export const getContract = (
  contractAddress: string = process.env.CONTRACT_ADDRESS
): ethers.Contract => {
  const contract = new ethers.Contract(
    contractAddress,
    [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "tokenHash",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "currentTotalSupply",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "invocations",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "bytes32[]",
            name: "identifiers",
            type: "bytes32[]",
          },
        ],
        name: "Created",
        type: "event",
      },
    ],
    provider
  );
  return contract;
};
