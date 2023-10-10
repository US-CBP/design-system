type BadgeProps = {
  label: string,
};

export const Badge = ({ label }: BadgeProps) => <div className="cbp-badge">{label}</div>;
