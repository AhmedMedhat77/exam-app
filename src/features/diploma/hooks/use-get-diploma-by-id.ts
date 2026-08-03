import { DIPLOMA_QUERY_KEYS } from '@/features/diploma/constants/diploma-keys';
import DiplomaService from '@/features/diploma/services/diploma.service';
import { useQuery } from '@tanstack/react-query';

export function useGetDiplomaById(id: string) {
  return useQuery({
    queryKey: DIPLOMA_QUERY_KEYS.diplomas.getById(id),
    queryFn: () => DiplomaService.getDiplomaByIdApi(id),
    enabled: Boolean(id),
  });
}
