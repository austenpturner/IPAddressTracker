import { useEffect } from "react";

const apiKey = import.meta.env.VITE_GEOLOCATION_API_KEY;

export function useFetchIPData(input, dispatch) {
  useEffect(() => {
    async function fetchData() {
      try {
        const geoIpifyUrl = input
          ? `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${input}`
          : `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}`;

        const ipApiUrl = input
          ? `http://ip-api.com/json/${input}`
          : `http://ip-api.com/json/`;

        const [geoResponse, ipResponse] = await Promise.all([
          fetch(geoIpifyUrl),
          fetch(ipApiUrl),
        ]);

        if (!geoResponse.ok || !ipResponse.ok) {
          throw new Error("One of the API calls failed");
        }

        const geoData = await geoResponse.json();
        const ipData = await ipResponse.json();

        const data = {
          results: [
            { id: 1, name: "IP Address", result: geoData.ip },
            {
              id: 2,
              name: "Location",
              result: `${geoData.location.region}, ${geoData.location.country}, ${ipData.zip}`,
            },
            {
              id: 3,
              name: "Timezone",
              result: `UTC ${geoData.location.timezone}`,
            },
            { id: 4, name: "ISP", result: geoData.isp },
          ],
          lat: ipData.lat,
          lng: ipData.lon,
        };

        dispatch({ type: "SET_OUTPUT", payload: data });
      } catch (error) {
        console.error("Error fetching IP data:", error);
      }
    }

    fetchData();
  }, [input, dispatch]);
}
