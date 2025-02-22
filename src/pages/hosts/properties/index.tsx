import HostLayout from "@/components/layout/HostLayout";
import Properties from "@/components/sections/Properties";
import { getMyProperties, getTheirBookings } from "@/utils/properties";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Bookings from "@/components/sections/Bookings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function MyProperties() {
  

    const { isPending, data } = useQuery({
      queryKey: ["all-properties"],
      queryFn: async () =>
        await Promise.all([getMyProperties(), getTheirBookings()]),
    });
    const properties = data?.[0];
    const bookings = data?.[1];

  if (isPending) {
    return <div>loading</div>;
  }
  return (
    <div className="text-white- bg-slate-50 pt-10">
    <Tabs defaultValue="properties" className="w-full bg-slate-50">
      <TabsList className="flex w-full gap-2 justify-center mx-auto bg-slate-50">
        <TabsTrigger value="properties">properties</TabsTrigger>
        <TabsTrigger value="bookings">bookings</TabsTrigger>
      </TabsList>
      <TabsContent value="properties">
        <Properties data={properties ?? []} header={
          <div className="text-center mb-12 flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Your Properties
            </h2>
            <Button asChild>
              <Link href={"/hosts/properties/create"}>Create Property</Link>
            </Button>
          </div>} />
      </TabsContent>
      <TabsContent value="bookings">
          <Bookings data={bookings ?? [] }  />
      </TabsContent>
    </Tabs>
  </div>
  );
}

MyProperties.getLayout = function getLayout(page: ReactNode) {
  return <HostLayout>{page}</HostLayout>;
};
