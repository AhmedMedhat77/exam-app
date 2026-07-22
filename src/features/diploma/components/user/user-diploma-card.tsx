import type { IDiploma } from '@/features/diploma/types/diploma.types';

export default function UserDiplomaCard(props: Partial<IDiploma>) {
  return (
    <div className="relative h-95 rounded-none border border-primary overflow-hidden group flex flex-col justify-end transition-all duration-300 hover:shadow-lg bg-slate-900">
      {/* Background Image */}
      <img
        src={props.image}
        alt={props.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
      />

      {/* Blue Overlay Box */}
      <div className="relative z-10 w-full bg-primary p-4 text-white font-mono">
        <h3 className="text-base md:text-lg font-bold text-white mb-1.5 font-mono line-clamp-1">
          {props.title}
        </h3>
        <p className="text-xs text-blue-100 font-mono leading-relaxed line-clamp-3 font-normal">
          {props.description}
        </p>
      </div>
    </div>
  );
}
