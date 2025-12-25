import Link from "next/link";

export default function ToolCard({ title, link }) {
  return (
    <Link href={link}>
      <div className="relative overflow-hidden p-6 border-l-4 border-green-400 rounded-2xl bg-white/60 backdrop-blur-md shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer group">
        {/* Ripple hover effect */}
        <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

        <h3 className="text-lg md:text-xl font-bold text-gradient relative z-10">
          {title}
        </h3>
        <p className="text-sm md:text-base text-gray-700 mt-2 relative z-10">
          Click to use this tool
        </p>
      </div>
    </Link>
  );
}
