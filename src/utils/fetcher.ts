import axios from "axios";

const updateOptions = () => {
  if (typeof window === "undefined") return {};

  const token = window.localStorage.getItem('lightlink-web-token')

  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

};
export default async function (url: string) {
  const { data } = await axios.get(url, updateOptions());
  return data;
}
