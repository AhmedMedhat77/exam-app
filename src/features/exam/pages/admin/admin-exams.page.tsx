import AdminHeader from '@/shared/components/admin-header';

export default function AdminExamsPage() {
  return (
    <div className="max-w-full space-y-6">
      <AdminHeader
        breadcrumbItems={[{ title: 'Exams', href: '/exams' }]}
        addNewLabel="Add New Exam"
        total={120}
        totalPages={12}
        limit={10}
        isLoading={false}
        onAddNew={() => {
          console.log('Add New Exam');
        }}
      />
    </div>
  );
}
