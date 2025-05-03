import Button from "@/components/common/Button";

interface HeaderProps {
  title: string;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger" | "outline";
    icon?: React.ReactNode;
  }>;
}

const Header = ({ title, actions = [] }: HeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || "primary"}
            onClick={action.onClick}
            className="flex items-center gap-2"
          >
            {action.icon && <span>{action.icon}</span>}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Header;
