export default async function UserProfilePage({params,}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
        <h2>Profile Updated-id</h2>
      User ID: {id}
    </div>
  );
}