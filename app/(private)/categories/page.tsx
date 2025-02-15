import CategoryAddDialog from './CategoryAddDialog';
import CategoryTable from './CategoryTable';

export default function Page() {
  return (
    <section className="space-y-3">
      <div>
        <p className="text-3xl font-extrabold">Categories</p>
        <div className="flex justify-between">
          <span className="text-mutedtext">All Categories</span>
          <CategoryAddDialog  />
        </div>
      </div>

      <CategoryTable />
    </section>
  );
}
