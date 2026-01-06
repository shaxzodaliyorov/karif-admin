import { Button } from "./components/ui/button";
import { Dropdown } from "./components/common/drop-down";
import { MoreVertical, Edit, Trash2, Copy } from "lucide-react";

function App() {
  return (
    <>
      <Button>click</Button>

      <Dropdown
        options={[
          {
            label: "Tahrirlash",
            icon: <Edit className="h-4 w-4" />,
            onClick: () => console.log("edit"),
          },
          {
            label: "Nusxa olish",
            icon: <Copy className="h-4 w-4" />,
            onClick: () => console.log("copy"),
          },
          {
            label: "O'chirish",
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => console.log("delete"),
          },
        ]}
      >
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </Dropdown>
    </>
  );
}

export default App;
