import type { IPaginatedParams } from '@/shared/types/api';

export type AuditCategory = 'DIPLOMA' | 'EXAM' | 'QUESTION' | 'USER' | 'SYSTEM';

export type AuditAction =
  'CREATE' | 'UPDATE' | 'DELETE' | 'SET_IMMUTABLE' | 'SEED_DATA';

export type AuditRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export type AuditSortBy = 'action' | 'user' | 'entity' | 'createdAt';
export type AuditSortOrder = 'asc' | 'desc';

export interface IAdminAuditLog {
  id: string;
  createdAt: string;
  actorUserId?: string | null;
  actorUsername: string;
  actorEmail: string;
  actorRole: AuditRole;
  category: AuditCategory;
  action: AuditAction;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  httpMethod?: string | null;
  path?: string | null;
}

export interface IGetAuditLogsParams extends IPaginatedParams {
  category?: AuditCategory;
  action?: AuditAction;
  actorUserId?: string;
  sortBy?: AuditSortBy;
  sortOrder?: AuditSortOrder;
  search?: string;
}
