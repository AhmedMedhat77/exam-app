import { PROFILE_QUERY_KEYS } from '@/features/profile/constants/query-keys';
import { ProfileService } from '@/features/profile/services/profile.service';
import { useQuery } from '@tanstack/react-query';

export function useGetProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEYS.getProfile,
    queryFn: ProfileService.fetchProfileApi,
  });
}
