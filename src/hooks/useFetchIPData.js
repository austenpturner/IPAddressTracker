import { useEffect } from "react";

const ipifyKey = import.meta.env.VITE_IPIFY_API_KEY;
const ipinfoKey = import.meta.env.VITE_IPINFO_API_KEY;

export function useFetchIPData(input, dispatch) {
  useEffect(() => {
    async function fetchData() {
      try {
        const geoIpifyUrl = input
          ? `https://geo.ipify.org/api/v2/country?apiKey=${ipifyKey}&ipAddress=${input}`
          : `https://geo.ipify.org/api/v2/country?apiKey=${ipifyKey}`;

        const ipApiUrl = input
          ? `https://ipinfo.io/${input}/json?token=${ipinfoKey}`
          : `https://ipinfo.io/json?token=${ipinfoKey}`;

        const [geoResponse, ipResponse] = await Promise.all([
          fetch(geoIpifyUrl),
          fetch(ipApiUrl),
        ]);

        if (!geoResponse.ok || !ipResponse.ok) {
          throw new Error("One of the API calls failed");
        }

        const geoData = await geoResponse.json();
        const ipData = await ipResponse.json();

        const [lat, lng] = ipData.loc.split(",");

        const data = {
          results: [
            { id: 1, name: "IP Address", result: geoData.ip },
            {
              id: 2,
              name: "Location",
              result: `${geoData.location.region}, ${geoData.location.country} ${ipData.postal}`,
            },
            {
              id: 3,
              name: "Timezone",
              result: `UTC ${geoData.location.timezone}`,
            },
            { id: 4, name: "ISP", result: geoData.isp },
          ],
          lat: Number(lat),
          lng: Number(lng),
        };

        dispatch({ type: "SET_OUTPUT", payload: data });
      } catch (error) {
        console.error("Error fetching IP data:", error);
      }
    }

    fetchData();
  }, [input, dispatch]);
}
