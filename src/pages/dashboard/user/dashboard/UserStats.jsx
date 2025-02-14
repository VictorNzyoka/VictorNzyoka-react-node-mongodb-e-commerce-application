import { DollarSign, Star, ShoppingBag } from "lucide-react"

const StatCard = ({ title, value, icon: Icon }) => (
  <div
    className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 
    hover:border-primary hover:shadow-xl transition-all duration-300 flex items-center"
  >
    <div className="mr-4">
      <div className="p-3 bg-primary/10 rounded-full">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
    <div>
      <h2 className="text-sm font-medium text-gray-500 mb-1">{title}</h2>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
)

const UserStats = ({ stats }) => {
  return (
    <div className="my-8 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">User Statistics</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Payments"
          value={`Ksh ${stats?.totalPayments?.toLocaleString() ?? 0}`}
          icon={DollarSign}
        />
        <StatCard title="Total Reviews" value={stats?.totalReviews?.toLocaleString() ?? 0} icon={Star} />
        <StatCard
          title="Total Purchased"
          value={stats?.totalPurchasedProducts?.toLocaleString() ?? 0}
          icon={ShoppingBag}
        />
      </div>
    </div>
  )
}

export default UserStats

