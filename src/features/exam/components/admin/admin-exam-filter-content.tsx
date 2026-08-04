import { useGetDiplomas } from '@/features/diploma/hooks/use-get-diploma';
import {
  DIPLOMA_ID_QUERY_KEY,
  IMMUTABLE_QUERY_KEY,
  PAGE_QUERY_KEY,
  SEARCH_QUERY_KEY,
} from '@/features/exam/components/constants/search-params.keys';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { ChevronsUpDown, Search } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

export default function AdminExamFilterContent() {
  const [query, setQuery] = useSearchParams();
  const [search, setSearch] = useState(() => query.get(SEARCH_QUERY_KEY) || '');
  const [immutable, setImmutable] = useState<string>(
    () => query.get(IMMUTABLE_QUERY_KEY) || 'none'
  );
  const [diplomaId, setDiplomaId] = useState(
    () => query.get(DIPLOMA_ID_QUERY_KEY) || 'none'
  );

  const { data: diplomasData } = useGetDiplomas({ limit: 100 });
  const diplomas = diplomasData?.payload?.data ?? [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery((prev) => {
      const next = new URLSearchParams(prev);
      if (search.trim()) {
        next.set(SEARCH_QUERY_KEY, search.trim());
      } else {
        next.delete(SEARCH_QUERY_KEY);
      }

      if (immutable && immutable !== 'none') {
        next.set(IMMUTABLE_QUERY_KEY, immutable);
      } else {
        next.delete(IMMUTABLE_QUERY_KEY);
      }

      if (diplomaId && diplomaId !== 'none') {
        next.set(DIPLOMA_ID_QUERY_KEY, diplomaId);
      } else {
        next.delete(DIPLOMA_ID_QUERY_KEY);
      }

      next.delete(PAGE_QUERY_KEY);
      return next;
    });
  };

  const handleClear = () => {
    setSearch('');
    setImmutable('none');
    setDiplomaId('none');
    setQuery((prev) => {
      const next = new URLSearchParams(prev);
      next.delete(SEARCH_QUERY_KEY);
      next.delete(IMMUTABLE_QUERY_KEY);
      next.delete(DIPLOMA_ID_QUERY_KEY);
      next.delete(PAGE_QUERY_KEY);
      return next;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        placeholder="Search by title"
        onChange={handleSearchChange}
        value={search}
        rightIcon={<Search className="size-4 text-gray-200" />}
      />

      <div className="flex h-11.5 w-full items-center gap-3">
        <Select
          value={diplomaId}
          onValueChange={(val) => val !== null && setDiplomaId(val)}
        >
          <SelectTrigger className="min-h-full w-1/2 rounded-xs px-3 text-gray-700">
            <SelectValue placeholder="Diploma">
              {diplomaId !== 'none'
                ? (diplomas.find((d) => d.id === diplomaId)?.title ?? 'Unknown')
                : 'All Diplomas'}
            </SelectValue>
            <ChevronsUpDown className="text-muted-foreground size-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className="text-gray-500 hover:text-gray-300"
              value="none"
            >
              All Diplomas
            </SelectItem>
            {diplomas.map((diploma) => (
              <SelectItem
                key={diploma.id}
                className="text-gray-500 hover:text-gray-300"
                value={diploma.id}
              >
                {diploma.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={immutable}
          onValueChange={(val) => val !== null && setImmutable(val)}
        >
          <SelectTrigger className="min-h-full w-1/2 rounded-xs px-3 text-gray-700">
            <SelectValue placeholder="Immutability">
              {immutable === 'true'
                ? 'Immutable'
                : immutable === 'false'
                  ? 'Mutable'
                  : 'None'}
            </SelectValue>
            <ChevronsUpDown className="text-muted-foreground size-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className="text-gray-500 hover:text-gray-300"
              value="none"
            >
              None
            </SelectItem>
            <SelectItem
              className="text-gray-500 hover:text-gray-300"
              value="true"
            >
              Immutable
            </SelectItem>
            <SelectItem
              className="text-gray-500 hover:text-gray-300"
              value="false"
            >
              Mutable
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full justify-end gap-2">
        <Button
          type="button"
          onClick={handleClear}
          className="w-40"
          variant="ghost"
          size="xl"
        >
          Clear
        </Button>
        <Button type="submit" variant="secondary" className="w-40" size="xl">
          Apply
        </Button>
      </div>
    </form>
  );
}
