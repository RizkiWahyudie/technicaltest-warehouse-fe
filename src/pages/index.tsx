import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import useSWR from "swr";
import { toast } from "react-toastify";
import { useEffect } from "react";

type Product = {
  code: string;
  name: string;
  description: string;
  weight: string;
  unit_of_measurement: string;
  category: string;
  created_at: string;
  updated_at: string;
};

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || "Gagal mengambil data");
    }
    return json;
  });

export default function Home({ token }: { token: string }) {
  const { data, error } = useSWR<Product[]>(
    token ? ["http://localhost:5050/api/products", token] : null,
    ([url, token]) => fetcher(url, token)
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <div className="max-w-5xl mx-auto bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Daftar Produk</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Create
          </button>
        </div>

        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Kode</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Kategori</th>
              <th className="p-2 border">Berat</th>
              <th className="p-2 border">Satuan</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product) => (
              <tr key={product.code}>
                <td className="p-2 border">{product.code}</td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border">{product.weight}</td>
                <td className="p-2 border">{product.unit_of_measurement}</td>
                <td className="p-2 border space-x-2 text-center">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!data && !error && <p className="mt-4 text-center">Memuat data...</p>}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
};
