import { useState, useMemo } from "react";

import { useConnection } from "hooks";
import { useReferrals } from "hooks/useReferrals";
import { useReferralSummary } from "hooks/useReferralSummary";
import { useUnclaimedReferralProofs } from "./hooks/useUnclaimedReferralProofs";

const DEFAULT_PAGE_SIZE = 10;

export const useReferralsView = () => {
  const { isConnected, account } = useConnection();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSizeState] = useState(DEFAULT_PAGE_SIZE);

  // Note: we need to reset the page to 0 whenever we change the size to avoid going off the end.
  const setPageSize = (newPageSize: number) => {
    // Reset current page to 0 when resetting the page size.
    setCurrentPage(0);
    setPageSizeState(newPageSize);
  };

  const pageSizes = useMemo(() => [10, 25, 50], []);
  const { referrals, pagination } = useReferrals(
    account,
    pageSize,
    pageSize * currentPage
  );
  const { summary, isLoading: isReferalSummaryLoading } =
    useReferralSummary(account);
  const { data: unclaimedReferralData } = useUnclaimedReferralProofs();

  return {
    referralsSummary: summary,
    unclaimedReferralRewardAmount: unclaimedReferralData?.claimableAmount,
    isReferalSummaryLoading,
    isConnected,
    account,
    referrals,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    pageSizes,
    totalReferralCount: pagination.total,
  };
};
