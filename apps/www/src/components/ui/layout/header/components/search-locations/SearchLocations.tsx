"use client";
import { MegaInput } from "@/components/ui/inputs/mega-input/MegaInput";
import { useMegaMenu } from "@/components/ui/navigation/mega-menu/MegeMenuProvider";
import { usePreviousSearch } from "@/hooks/usePreviousSearch";
import { useSearchParam } from "@/hooks/useSearchParam";
import { useSearchLocations } from "@/services/actions/locations";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
export const SearchLocations = () => {
  // Hooks
  const [previousLocations, addPrevious] = usePreviousSearch("locations");
  const { active, setActive } = useMegaMenu();
  const [searchParams, setSearchParams] = useSearchParam({
    autoNavigate: true,
  });

  // States
  const [search, setSearch] = useState(searchParams.get("filter_name") || "");
  const debouncedSearch = useDebounce(search, 500);

  // API Calls
  const { data } = useSearchLocations(debouncedSearch);

  // Effects
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!debouncedSearch) searchParams.delete("filter_name");
    else searchParams.set("filter_name", debouncedSearch);
    setSearchParams(searchParams);
  }, [debouncedSearch]);

  // Callbacks
  const handleChange = (state: boolean, name?: string) => {
    if (!name || !state) {
      setActive(null);
      return;
    }
    setActive(name!);
  };
  const onSelect = (compound: Compound) => {
    addPrevious({ id: compound.id, name: compound.name });
    setActive(null);
  };

  const previewOld = !data?.length && previousLocations.length > 0;

  return (
    <MegaInput
      modal={{
        className: "left-0",
      }}
      name="location"
      label="Where"
      onChange={handleChange}
      selected={active === "location"}
      input={
        <MegaInput.Input
          placeholder="Search destinations"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      }
    >
      <div className="grid gap-4 max-h-52 overflow-auto">
        {!previewOld && !data?.length && <div>No Previous Locations</div>}

        {previewOld &&
          previousLocations?.map((compound) => (
            <div
              onClick={() => onSelect(compound as Compound)}
              key={compound.id}
              className="w-full hover:bg-slate-100 p-2 rounded-lg flex items-center"
            >
              <MdHistory className="inline mr-2" />
              <span className="text-sm font-semibold">{compound.name}</span>
            </div>
          ))}
        {data?.map((compound) => (
          <div
            onClick={() => onSelect(compound)}
            key={compound.id}
            className="w-full hover:bg-slate-100 p-2 rounded-lg"
          >
            {compound.name}
          </div>
        ))}
      </div>
    </MegaInput>
  );
};
