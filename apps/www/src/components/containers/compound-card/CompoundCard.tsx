"use client";
import { Card } from "../../ui/cards/card/Card";
import { MouseEvent, useRef } from "react";
import { useSearchParamValue } from "@/hooks/useSearchParamValue";
import { useGetLocationImages } from "@/services/actions/locations";
import { formatCurrency } from "@/utils/formatCurrency";
import { useFirstHover } from "@/hooks/useFirstHover";
import { Slider, SliderRef } from "@/components/ui/sliders/slider/Slider";
import { useFlatInfiniteData } from "@/hooks/useFlatInfiniteData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LikeButton } from "@/components/ui/inputs/like-button/LikeButton";
import { useFavorites } from "@/hooks/useFavorites";
import { ClientOnly } from "@/components/utils/client-only/ClientOnly";
type CompoundCardProps = {
  compound: Compound;
  innerRef?: React.Ref<HTMLDivElement>;
};
export const CompoundCard = ({ compound, innerRef }: CompoundCardProps) => {
  const { data, hasNextPage, fetchNextPage, refetch } = useGetLocationImages(
    compound.id
  );



  const tab = useSearchParamValue("tab");

  const [ref] = useFirstHover(() => {
    refetch();
  });
  const sliderRef = useRef<SliderRef | null>(null);

  const flat = useFlatInfiniteData({ data, key: "data" });
  const handleOnSliderChange = (index: number) => {
    if (index === flat?.length! - 2 && hasNextPage) fetchNextPage();
  };

  const router = useRouter();


  return (
    <div className="relative">
      <Link
        className="absolute top-0 left-0 w-full h-full"
        rel="noopener noreferrer nofollow"
        target="_self"
        aria-label={compound.name}
        href={`compound/${compound.id}`}
      />
      <Card
        innerRef={innerRef}
        onClick={() => router.push(`/compound/${compound.id}`)}
      >
        <Card.Content innerRef={ref as any}>
          <div className="absolute top-0 end-0 z-10 text-lg p-4 cursor-pointer">
            <ClientOnly>

              <LikeButton compound={compound} />
            </ClientOnly>
          </div>
          <div className="aspect-[20/19]">
            <div className="h-full rounded-xl overflow-hidden bg-red-400 relative">
              <Slider onChange={handleOnSliderChange} ref={sliderRef}>
                <Slider.Slide>
                  <picture>
                    <img
                      className="h-full w-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${compound.image}`}
                      alt={compound.name}
                    />
                  </picture>
                </Slider.Slide>
                {data?.map((images) =>
                  images.data.map((image, index) => (
                    <Slider.Slide key={`${image.location_id}-${index}`}>
                      <picture>
                        <img
                          className="h-full w-full object-cover"
                          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${image.url}`}
                          alt={compound.name}
                        />
                      </picture>
                    </Slider.Slide>
                  ))
                )}
              </Slider>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <div className="font-semibold">{compound.name}</div>
          {tab === "Buy" && (
            <div className="text-sm">
              <span className="font-semibold">Market Sale Price: </span>
              {formatCurrency(compound.market_sale_price)}
            </div>
          )}
          {tab === "Rent" && (
            <div className="text-sm">
              <span className="font-semibold ">Rent Price: </span>
              {formatCurrency(compound.rent_price)}
            </div>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};
