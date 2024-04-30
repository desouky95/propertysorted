import { MegaInput } from "@/components/ui/inputs/mega-input/MegaInput";
import { useMegaMenu } from "@/components/ui/navigation/mega-menu/MegeMenuProvider";
import { useSearchParam } from "@/hooks/useSearchParam";
import { useSearchParamValue } from "@/hooks/useSearchParamValue";
import { useState } from "react";

const SIZES = [67, 90, 116, 140];
export const SelectSizes = () => {
  const [searchParams, setSearchParams] = useSearchParam({
    autoNavigate: true,
  });
  const qsValue = useSearchParamValue("filter_sizes");
  const { active, setActive } = useMegaMenu();
  // const searchParams = useS
  const [sizes, setSizes] = useState<number[]>(() => {
    const sizes = qsValue?.split(",").map((_) => Number(_));
    return sizes || [];
  });

  const handleSelect = (size: number) => {
    const index = sizes.findIndex((_) => _ === size);
    if (index > -1) {
      handleRemove(index);
      return;
    }
    const new_sizes = [...sizes, size];
    updateSizes(new_sizes);
  };
  const handleRemove = (index: number) => {
    const new_sizes = sizes;
    new_sizes.splice(index, 1);
    updateSizes(new_sizes);
  };
  const updateSizes = (new_sizes: number[]) => {
    setSizes(new_sizes);
    const getSizesStr = () => new_sizes.sort((a, b) => a - b).join(",");
    if (new_sizes.length === 0) searchParams.delete("filter_sizes");
    else searchParams.set("filter_sizes", getSizesStr());
    setSearchParams(searchParams);
  };
  const handleChange = (state: boolean, name?: string) => {
    if (!name || !state) {
      setActive(null);
      return;
    }
    setActive(name!);
  };

  const isSizeSelected = (size: number) => sizes.find((_) => _ === size);
  return (
    <MegaInput
      onChange={handleChange}
      modal={{
        className: "sm:-translate-x-1/4",
      }}
      label="Size"
      name="size"
      input={<MegaInput.Input placeholder="Select size" />}
      selected={active === "size"}
    >
      <div className="grid grid-cols-2 gap-2 gap-y-3">
        {SIZES.map((size) => (
          <div
            key={size}
            onClick={() => {
              handleSelect(size);
            }}
            className={`w-full min-h-8 border-orange-200 border border-solid rounded-xl hover:bg-orange-100 flex p-4 justify-center ${
              isSizeSelected(size) && "bg-orange-100"
            }`}
          >
            {size}
          </div>
        ))}
      </div>
    </MegaInput>
  );
};
