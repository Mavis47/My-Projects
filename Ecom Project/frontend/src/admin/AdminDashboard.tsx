export default function AdminDashboard() {

  return (
    <>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <div className="flex space-x-4 mb-4 md:justify-center">
        <button  className="bg-blue-500 text-white px-4 py-2 rounded">
          <a href='/dashboard/admin/create-product'>Create Product</a>
        </button>
        <button  className="bg-green-500 text-white px-4 py-2 rounded">
          <a href="/dashboard/admin/users">Show Users</a>
        </button>
        <button  className="bg-purple-500 text-white px-4 py-2 rounded">
          <a href="/dashboard/admin/create-category">Create Category</a>
        </button>
        <button  className="bg-red-500 text-white px-4 py-2 rounded">
          <a href="/dashboard/admin/show-products">Show Products</a>
        </button>
        <button className="bg-yellow-300 text-white px-4 py-2 rounded">
          <a href="/dashboard/admin/show-category">Show Category</a>
        </button>
      </div>
    </div>    
    </>
  )
}
