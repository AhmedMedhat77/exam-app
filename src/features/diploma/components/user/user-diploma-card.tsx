import type { IDiploma } from '@/features/diploma/types/diploma.types';

export default function UserDiplomaCard(props: Partial<IDiploma>) {
  return (
    <div className="relative h-95 rounded-none overflow-hidden group flex flex-col justify-end transition-all duration-300 hover:shadow-lg bg-slate-900 cursor-pointer">
      {/* Background Image */}
      <img
        src={props.image}
        alt={props.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Blue Overlay Box Of Content */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[95%] mx-auto bg-[#155DFCBF]/75 p-4 text-white font-mono h-32 group-hover:h-[90%] group-hover:bottom-5 transition-all duration-300">
        <h3 className="text-base md:text-lg font-bold text-white mb-1.5 font-mono line-clamp-1">
          {props.title}
        </h3>
        <p className="text-xs text-blue-100 font-mono leading-relaxed line-clamp-3 group-hover:line-clamp-none font-normal">
          {props.description}
        </p>
      </div>
    </div>
  );
}
