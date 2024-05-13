import { useEffect } from "react";
import {
  readHederaVaultAsset,
  readHederaVaultAssetTotalSupply,
  readHederaVaultBalanceOf,
  readHederaVaultDecimals,
  readHederaVaultMaxMint,
  readHederaVaultOwner,
} from "../../services/contracts/wagmiGenActions";

export default function User() {
  useEffect(() => {
    readHederaVaultAsset({}).then((res) => {
      console.log("vault asset", res.toString());
    });

    readHederaVaultAssetTotalSupply({}).then((res) => {
      console.log("vault total supply", res.toString());
    });

    readHederaVaultDecimals({}).then((res) => {
      console.log("vault decimals", res.toString());
    });

    readHederaVaultOwner({}).then((res) => {
      console.log("vault owner", res.toString());
    });
  }, []);

  return <>WIP</>;
}
