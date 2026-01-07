import { LANGUAGES } from "@/constants/lanugues";
import { Button } from "../common/button/button";
import { Dropdown } from "../common/drop-down";
import { useState } from "react";

export const SwitchLanguage = () => {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  return (
    <div>
      <Dropdown
        options={LANGUAGES.map((language) => ({
          value: language.code,
          label: language.name,
          icon: (<language.icon />) as any,
          onClick: () => setLanguage(language as any),
        }))}
      >
        <Button variant={"outline"} className="flex justify-end">
          <language.icon />
          {language.name}
        </Button>
      </Dropdown>
    </div>
  );
};
