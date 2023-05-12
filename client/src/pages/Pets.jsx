import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllPets } from "../api";

function PetCard({ pet }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg gb-gray-100 dark:bg-gray-600 p-12 m-4 flex-col justify-center text-center">
      <p className="text-xl underline">{pet.pet_name}</p>
      <p className="text-md">({pet.pet_type})</p>
      <p className="text-sm">{pet.pet_description}</p>
    </div>
  );
}

export default function Pets() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const petsQuery = useQuery({
    queryKey: ["pets"],
    queryFn: getAllPets,
    enabled: !!user,
  });

  return (
    <div className="flex flex-col items-center p-12 h-screen">
      <h1 className="text-4xl font-bold m-12">Pets</h1>
      <div className="flex flex-col items-center justify-center">
        {petsQuery.isLoading && <p>Loading...</p>}
        {petsQuery.isError && <p>Error: {petsQuery.error.message}</p>}
        {petsQuery.isSuccess && (
          <>
            <h3 className="text-xl">List of Pets</h3>
            <ul className="flex flex-col items-center justify-center">
              {petsQuery.data.map((pet) => (
                <li key={pet.id} >
                  <PetCard pet={pet} />
                </li>
              ))}
            </ul>
          </>

        )}
      </div>
    </div>
  )
}