import Properties from "@/components/sections/Properties";
import { getAllProperties } from "@/utils/properties";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllMyBookings } from "@/utils/bookings";
import Bookings from "@/components/sections/Bookings";

export default function MyProperties() {
  const { isPending, data } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () =>
      await Promise.all([getAllProperties(), getAllMyBookings()]),
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
          <Properties data={properties ?? []} />
        </TabsContent>
        <TabsContent value="bookings">
            <Bookings data={bookings ?? []}  />
        </TabsContent>
      </Tabs>
    </div>
  );
}
