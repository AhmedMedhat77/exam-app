import type {
  IAdminAuditLog,
  IGetAuditLogsParams,
} from '@/features/audit/types/audit.d';
import { axiosInstance } from '@/shared/lib/axios';
import type { IApiResponse, IPaginatedAPIResponse } from '@/shared/types/api';

const BASE_URL = '/api/admin/audit-logs';

export class AuditService {
  /** GET /api/admin/audit-logs - List admin audit log entries */
  static getAuditLogsApi = async (
    params?: IGetAuditLogsParams
  ): Promise<IPaginatedAPIResponse<IAdminAuditLog[]>> => {
    const response = await axiosInstance.get(BASE_URL, { params });
    return response.data;
  };

  /** GET /api/admin/audit-logs/{id} - Get one admin audit log entry */
  static getAuditLogByIdApi = async (
    id: string
  ): Promise<IApiResponse<{ auditLog: IAdminAuditLog }>> => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  };

  /** DELETE /api/admin/audit-logs/{id} - Delete one admin audit log entry */
  static deleteAuditLogApi = async (
    id: string
  ): Promise<IApiResponse<{ message: string }>> => {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
    return response.data;
  };

  /** DELETE /api/admin/audit-logs - Clear all admin audit log entries */
  static clearAllAuditLogsApi = async (): Promise<
    IApiResponse<{ message: string }>
  > => {
    const response = await axiosInstance.delete(BASE_URL);
    return response.data;
  };
}

export default AuditService;
