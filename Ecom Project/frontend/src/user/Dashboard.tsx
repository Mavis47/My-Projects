import { useAuth } from '../contexts/auth.context'
export default function Dashboard() {

  const {auth} = useAuth();

  return (
    <>
        <div className="container mx-96 p-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 p-2" style={{backgroundColor: "#c6f7e6"}}>
            <div className="bg-white shadow-md rounded-lg p-4" style={{backgroundColor: "#ebfbff"}}>
              <h3 className="text-lg font-bold">Your Details</h3>
              <p><strong>Name:</strong> {auth?.user?.name}</p>
              <p><strong>Email:</strong> {auth?.user?.email}</p>
              <p><strong>Address:</strong> {auth?.user?.address}</p>
              <p><strong>Phone Number:</strong> {auth?.user?.phone}</p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}
