import { useCallback, useEffect, useState } from "react";
import { discordClientId } from "utils";
import { useQueryParams } from "./useQueryParams";

const STORAGE_KEY = "discord_JWT";

export function useDiscord() {
  const params = useQueryParams();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [discordJWT, setDiscordJWT] = useState<string | undefined>(undefined);
  const [hasOAuthToken, setHasOAuthToken] = useState<boolean | undefined>(
    undefined
  );
  const [discordOAuthToken, setDiscordOAuthToken] = useState<
    string | undefined
  >(undefined);

  const authenticate = useCallback((jwt: string) => {
    setDiscordJWT(jwt);
    setIsAuthenticated(true);
    window.localStorage.setItem(STORAGE_KEY, jwt);
  }, []);

  const unauthenticate = useCallback(() => {
    setDiscordJWT(undefined);
    setIsAuthenticated(false);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const redirectToAuth = useCallback(() => {
    unauthenticate();
    const queryString = new URLSearchParams({
      client_id: discordClientId,
      redirect_uri: `${window.location.origin}/auth/discord`,
      response_type: "code",
      scope: "identify",
    }).toString();
    const url = `https://discord.com/api/oauth2/authorize?${queryString}`;
    window.location.replace(url);
  }, [unauthenticate]);

  useEffect(() => {
    const storedJWT = window.localStorage.getItem(STORAGE_KEY);
    setIsAuthenticated(Boolean(storedJWT));
    setDiscordJWT((jwt) => (jwt ? jwt : storedJWT) ?? undefined);
    setDiscordOAuthToken(params["code"] || undefined);
    setHasOAuthToken(typeof params["code"] !== "undefined");
  }, [params]);

  return {
    redirectToAuth,
    authenticate,
    unauthenticate,
    isAuthenticated,
    discordJWT,
    discordOAuthToken,
    hasOAuthToken,
  };
}
