"use client";

import {
  useGetLocation,
  useGetLocationAssets,
} from "@/services/actions/locations";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Map,
  APIProvider,
  AdvancedMarker,
  Pin,
  Marker,
} from "@vis.gl/react-google-maps";
import { Slider } from "@/components/ui/sliders/slider/Slider";
export const Location = () => {
  const { id } = useParams();
  const { data } = useGetLocation(id as any as number);
  const { data: images } = useGetLocationAssets(id as any as number);

  if (!data) return <p>Loading...</p>;
  return (
    <main className="site-content">
      <div className="px-5 md:px-20 mt-4 md:mt-6 mb-12">
        <div className="container mx-auto">
          <section className="hidden md:flex aspect-[3/1] gap-2 rounded-lg overflow-hidden">
            <div className="flex-1 relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data.image}`}
                alt={data.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
              {images?.slice(0, 4)?.map((image) => (
                <div key={image.url} className="relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${image.url}`}
                    alt={data.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className=" md:hidden">
            <Slider>
              <Slider.Slide>
                <picture>
                  <img
                    className="h-full w-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data.image}`}
                    alt={data.name}
                  />
                </picture>
              </Slider.Slide>

              {images?.map((image, index) => (
                <Slider.Slide key={`${image.location_id}-${index}`}>
                  <picture>
                    <img
                      className="h-full w-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${image.url}`}
                      alt={data.name}
                    />
                  </picture>
                </Slider.Slide>
              ))}
            </Slider>
          </section>
          <section className="py-4 md:py-8">
            <h2 className="text-xl font-bold">{data.name}</h2>
            <div>Sizes: {data.sizes.join(",")}</div>
          </section>

          <section>
            <h2 className="text-xl font-bold py-4 md:py-8">Location</h2>
            <APIProvider apiKey="">
              <div className="rounded-lg overflow-hidden w-full md:w-1/2">
                <Map
                  style={{ width: "100%", height: "40vh" }}
                  defaultCenter={{
                    lat: data.location.lat,
                    lng: data.location.lon,
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: data.location.lat,
                      lng: data.location.lon,
                    }}
                    title={data.name}
                  />
                </Map>
              </div>
            </APIProvider>
          </section>
        </div>
      </div>
    </main>
  );
};
