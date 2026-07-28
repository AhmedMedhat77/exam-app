import AdminSearchFiltersContainer from '@/shared/components/admin-search-filters-container';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { ChevronsUpDown, Search, SlidersHorizontal } from 'lucide-react';

export default function AdminDiplomaPage() {
  return (
    <div>
      <AdminSearchFiltersContainer
        title="Search & Filters"
        icon={<SlidersHorizontal className="size-6" />}
      >
        <Input
          placeholder="Search by title"
          rightIcon={<Search className="size-4 text-gray-200" />}
        />

        <div className="flex w-full items-center gap-3">
          <Select>
            <SelectTrigger className="w-1/2 rounded-xs px-3">
              <SelectValue placeholder="Diploma" />
              <ChevronsUpDown className="text-muted-foreground size-4" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-1/2 rounded-xs px-3">
              <SelectValue placeholder="Immutability" />
              <ChevronsUpDown className="text-muted-foreground size-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
              <SelectItem value="published">Published</SelectItem>
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
      </AdminSearchFiltersContainer>
    </div>
  );
}
