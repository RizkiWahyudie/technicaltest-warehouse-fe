interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="text-center py-12 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
