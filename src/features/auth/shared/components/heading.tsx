import { cn } from '@/shared/lib/utils';

interface IHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export default function Heading({ className, children }: IHeadingProps) {
  return (
    <h1
      className={cn(
        'font-heading mb-8 text-start text-2xl font-medium text-gray-800',
        className
      )}
    >
      {children}
    </h1>
  );
}
