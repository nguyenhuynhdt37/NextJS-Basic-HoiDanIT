"use client";
import axios from "axios";
import useSWR from "swr";
import AppTable from "@/components/app.table";
export default function Blogs() {
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log("check data", data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <AppTable blogs={data} />
    </div>
  );
}
