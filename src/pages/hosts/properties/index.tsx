import HostLayout from "@/components/layout/HostLayout";
import Properties from "@/components/sections/Properties";
import { Button } from "@/components/ui/button";
import { getMyProperties } from "@/utils/properties";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ReactNode } from "react";

export default function MyProperties() {
  const { isPending, data } = useQuery({
    queryKey: ["my-properties"],
    queryFn: getMyProperties,
  });

  if (isPending) {
    return <div>loading</div>;
  }
  return (
    <div className="text-white- bg-slate-50">
      <Properties
        data={data ?? []}
        header={
          <div className="text-center mb-12 flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Your Properties
            </h2>
            <Button asChild>
              <Link href={"/hosts/properties/create"}>Create Property</Link>
            </Button>
          </div>
        }
      />
      me
    </div>
  );
}

MyProperties.getLayout = function getLayout(page: ReactNode) {
  return <HostLayout>{page}</HostLayout>;
};
