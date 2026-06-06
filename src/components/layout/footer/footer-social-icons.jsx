import { Link } from "@tanstack/react-router";

export function FooterSocialIcons({ data }) {
  return (
    <div className="flex gap-4">
      {data?.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center p-2 border border-primary
              text-primary transition-all duration-300 hover:border-gold hover:text-primary
              hover:scale-110 before:absolute before:inset-0  before:bg-linear-to-br before:from-primary before:to-gold before:opacity-0 before:transition-opacity before:duration-300
              hover:before:opacity-20"
          >
            <Icon size={18} />
          </Link>
        );
      })}
    </div>
  );
}
