import AirdropCard from "../AirdropCard";
import RewardsCard from "../content/RewardsCard";
import { RewardsApiInterface } from "utils/serverless-api/types";
import { shortenAddress } from "utils";

import { ReactComponent as MoneyIcon } from "assets/icons/plaap/money.svg";
import { ReactComponent as WalletIcon } from "assets/icons/wallet-icon.svg";
import { CheckIconState } from "../CardIcon";

interface Props {
  rewardsData: RewardsApiInterface;
  account: string | undefined;
}

function useLiquidityProviderCard(rewardsData: RewardsApiInterface) {
  const check: CheckIconState = rewardsData?.liquidityProviderRewards
    ?.walletEligible
    ? "eligible"
    : "ineligible";
  return { check };
}

const LiquidityProviderCard: React.FC<Props> = ({ account, rewardsData }) => {
  const { check } = useLiquidityProviderCard(rewardsData);
  return (
    <AirdropCard
      title="Liquidity Provider"
      description="Liquidity providers who pool ETH, USDC, WBTC, and DAI into Across protocol before the token launch may be eligible for the $ACX airdrop."
      Icon={MoneyIcon}
      check={check}
      children={
        <RewardsCard
          label="Eligible wallet"
          address={shortenAddress(account || "", "...", 4)}
          Icon={<WalletIcon />}
          bottomText="Rewards are estimated as of September 1, 2022 and are subject to change.  Liquidity providers continue to earn ACX up to token launch."
          amount="2056.112"
        />
      }
    />
  );
};

export default LiquidityProviderCard;
