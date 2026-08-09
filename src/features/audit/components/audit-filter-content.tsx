import {
  ACTION_QUERY_KEY,
  CATEGORY_QUERY_KEY,
  PAGE_QUERY_KEY,
  SEARCH_QUERY_KEY,
  USER_QUERY_KEY,
} from '@/features/audit/constants/search-params.keys';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router';

export default function AuditFilterContent() {
  const [query, setQuery] = useSearchParams();

  const [category, setCategory] = useState<string>(
    () => query.get(CATEGORY_QUERY_KEY) || 'all'
  );
  const [action, setAction] = useState<string>(
    () => query.get(ACTION_QUERY_KEY) || 'all'
  );
  const [user, setUser] = useState<string>(
    () => query.get(USER_QUERY_KEY) || query.get(SEARCH_QUERY_KEY) || ''
  );

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setQuery((prev) => {
      const next = new URLSearchParams(prev);

      if (category && category !== 'all') {
        next.set(CATEGORY_QUERY_KEY, category);
      } else {
        next.delete(CATEGORY_QUERY_KEY);
      }

      if (action && action !== 'all') {
        next.set(ACTION_QUERY_KEY, action);
      } else {
        next.delete(ACTION_QUERY_KEY);
      }

      if (user.trim()) {
        next.set(USER_QUERY_KEY, user.trim());
        next.set(SEARCH_QUERY_KEY, user.trim());
      } else {
        next.delete(USER_QUERY_KEY);
        next.delete(SEARCH_QUERY_KEY);
      }

      next.delete(PAGE_QUERY_KEY);
      return next;
    });
  };

  const handleClear = () => {
    setCategory('all');
    setAction('all');
    setUser('');
    setQuery((prev) => {
      const next = new URLSearchParams(prev);
      next.delete(CATEGORY_QUERY_KEY);
      next.delete(ACTION_QUERY_KEY);
      next.delete(USER_QUERY_KEY);
      next.delete(SEARCH_QUERY_KEY);
      next.delete(PAGE_QUERY_KEY);
      return next;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Category Select */}
        <Select
          value={category}
          onValueChange={(val) => val !== null && setCategory(val)}
        >
          <SelectTrigger className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-gray-700">
            <SelectValue placeholder="Category">
              {category === 'all' || !category ? 'Category' : category}
            </SelectValue>
            <ChevronsUpDown className="text-muted-foreground size-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Category</SelectItem>
            <SelectItem value="DIPLOMA">Diploma</SelectItem>
            <SelectItem value="EXAM">Exam</SelectItem>
            <SelectItem value="QUESTION">Question</SelectItem>
            <SelectItem value="USER">User</SelectItem>
            <SelectItem value="SYSTEM">System</SelectItem>
          </SelectContent>
        </Select>

        {/* Action Select */}
        <Select
          value={action}
          onValueChange={(val) => val !== null && setAction(val)}
        >
          <SelectTrigger className="h-11 w-full rounded-md border border-gray-200 bg-white px-3 text-gray-700">
            <SelectValue placeholder="Action">
              {action === 'all' || !action ? 'Action' : action}
            </SelectValue>
            <ChevronsUpDown className="text-muted-foreground size-4" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Action</SelectItem>
            <SelectItem value="CREATE">Create</SelectItem>
            <SelectItem value="UPDATE">Update</SelectItem>
            <SelectItem value="DELETE">Delete</SelectItem>
            <SelectItem value="SET_IMMUTABLE">Set Immutable</SelectItem>
            <SelectItem value="SEED_DATA">Seed Data</SelectItem>
          </SelectContent>
        </Select>

        {/* User Input */}
        <Input
          placeholder="User"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="h-11"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button
          type="button"
          onClick={handleClear}
          variant="outline"
          size="xl"
          className="w-32 cursor-pointer"
        >
          Clear
        </Button>
        <Button
          type="submit"
          variant="secondary"
          size="xl"
          className="w-32 cursor-pointer"
        >
          Apply
        </Button>
      </div>
    </form>
  );
}
