import { SEARCH_QUERY_KEY } from '@/features/diploma/components/constants/search-params.keys';
import { useDebounce } from '@/shared/hooks/use-debounce';
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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function AdminDiplomaFilterContent() {
  const [query, setQuery] = useSearchParams();
  const [search, setSearch] = useState(query.get(SEARCH_QUERY_KEY) || '');
  const debouncedSearch = useDebounce(search, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearch) {
      query.set(SEARCH_QUERY_KEY, debouncedSearch);
    } else {
      query.delete(SEARCH_QUERY_KEY);
    }
    setQuery(query);
  }, [debouncedSearch, query, setQuery]);

  return (
    <>
      <Input
        placeholder="Search by title"
        onChange={handleSearchChange}
        value={search}
        rightIcon={<Search className="size-4 text-gray-200" />}
      />

      <div className="flex h-11.5 w-full items-center gap-3">
        <Select>
          <SelectTrigger className="min-h-full w-1/2 rounded-xs px-3 text-gray-400">
            <SelectValue placeholder="Immutability" />
            <ChevronsUpDown className="text-muted-foreground size-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              className="text-gray-500 hover:text-gray-300"
              value="draft"
            >
              Draft
            </SelectItem>
            <SelectItem
              className="text-gray-500 hover:text-gray-300"
              value="archived"
            >
              Archived
            </SelectItem>
            <SelectItem
              className="text-gray-500 hover:text-gray-300"
              value="published"
            >
              Published
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full justify-end gap-2">
        <Button className="w-40" variant="ghost" size="xl">
          Clear
        </Button>
        <Button variant="secondary" className="w-40" size="xl">
          Apply
        </Button>
      </div>
    </>
  );
}
