"use client";

import { ButtonGroup } from "@/components/ui/inputs/button-group/ButtonGroup";
import { Button } from "@/components/ui/inputs/button/Button";
import { useSearchParam } from "@/hooks/useSearchParam";

const tabType = {
  0: "Buy",
  1: "Rent",
  2: "Meter Price",
};
export const TabMenu = () => {
  const [searchParams, setSearchParams, navigate] = useSearchParam();

  const handleOnChange = (value: number) => {
    searchParams.set("tab", tabType[value as keyof typeof tabType]);
    const params = setSearchParams(searchParams);
    navigate(params);
  };

  return (
    <ButtonGroup
      onChange={handleOnChange}
      className="h-20 flex items-center justify-center"
    >
      <Button>Buy</Button>
      <Button>Rent</Button>
      <Button>Meter Price</Button>
    </ButtonGroup>
  );
};
