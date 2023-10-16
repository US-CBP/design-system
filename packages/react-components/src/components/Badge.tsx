interface BadgeProps {
  label: string | number
};

export const Badge = ({ label }: BadgeProps) => <div className="cbp-badge">{label}</div>;
