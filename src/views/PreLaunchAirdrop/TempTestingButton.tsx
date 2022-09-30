import { ButtonV2 } from "components";
import axios from "axios";
import { rewardsApiUrl } from "utils";
import { useConnection } from "hooks";
import { parseEther } from "utils";
// This resets the dev wallet to ineligible state.
const TempTestingButton = () => {
  const { account } = useConnection();
  return (
    <div style={{ width: "200px", margin: "0 auto" }}>
      <label style={{ margin: "1rem auto" }}>
        Reset Connected to Zero Rewards
      </label>
      <ButtonV2
        style={{ width: "200px", margin: "0 auto 1rem" }}
        size="md"
        onClick={() => {
          axios
            .patch(`${rewardsApiUrl}/airdrop/rewards/wallet-rewards`, {
              walletAddress: account,
              earlyUserRewards: "0",
              liquidityProviderRewards: "0",
              welcomeTravellerRewards: "0",
            })
            .then((res) => {
              console.log("success?", res);
            })
            .catch((err) => console.log("err in call", err));
        }}
      >
        Reset to Zero
      </ButtonV2>
      <label style={{ margin: "1rem auto" }}>Reset Connected Address</label>
      <ButtonV2
        style={{ width: "200px", margin: "0 auto 1rem" }}
        size="md"
        onClick={() => {
          axios
            .patch(`${rewardsApiUrl}/airdrop/rewards/wallet-rewards`, {
              walletAddress: account,
              earlyUserRewards: parseEther("500").toString(),
              liquidityProviderRewards: parseEther("1000").toString(),
              welcomeTravellerRewards: parseEther("15000").toString(),
            })
            .then((res) => {
              console.log("success?", res);
            })
            .catch((err) => console.log("err in call", err));
        }}
      >
        Reset to Some Rewards
      </ButtonV2>
    </div>
  );
};

export default TempTestingButton;