import type { IDiploma } from '@/features/diploma/types/diploma.d';

export default function UserDiplomaCard(props: Partial<IDiploma>) {
  return (
    <div className="group relative flex h-95 cursor-pointer flex-col justify-end overflow-hidden rounded-none bg-slate-900 transition-all duration-300 hover:shadow-lg">
      {/* Background Image */}
      <img
        src={props.image}
        alt={props.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Blue Overlay Box Of Content */}
      <div className="absolute bottom-2 left-1/2 mx-auto h-32 w-[95%] -translate-x-1/2 bg-[#155DFCBF]/75 p-4 font-mono text-white transition-all duration-300 group-hover:bottom-5 group-hover:h-[90%]">
        <h3 className="mb-1.5 line-clamp-1 font-mono text-base font-bold text-white md:text-lg">
          {props.title}
        </h3>
        <p className="line-clamp-3 font-mono text-xs leading-relaxed font-normal text-blue-100 group-hover:line-clamp-none">
          {props.description}
        </p>
      </div>
    </div>
  );
}
