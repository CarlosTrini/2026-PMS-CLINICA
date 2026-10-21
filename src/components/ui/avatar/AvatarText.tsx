interface AvatarTextProps {
  name: string;
  className?: string;
}

const AvatarText: React.FC<AvatarTextProps> = ({ name, className = "" }) => {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent pastel color based on the name
  const getColorClass = (name: string) => {
    const colors = [
      "bg-brand-light text-brand-dark",
      "bg-pink-100 text-pink-600",
      "bg-cyan-100 text-cyan-600",
      "bg-orange-light text-orange-dark",
      "bg-green-100 text-green-600",
      "bg-purple-100 text-purple-600",
      "bg-yellow-100 text-yellow-600",
      "bg-error-light text-error-dark",
    ];

    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div
      className={`flex h-10 w-10 ${className} items-center justify-center rounded-full ${getColorClass(
        name,
      )}`}
    >
      <span className="text-sm font-medium">{initials}</span>
    </div>
  );
};

export default AvatarText;
