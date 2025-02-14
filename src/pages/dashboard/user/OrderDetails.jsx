import { useGetOrderByIdQuery } from "../../../redux/features/orders/orderApi"
import { useParams } from "react-router-dom"
import TimeLineStep from "../../../components/TimeLineStep"

const OrderDetails = () => {
  const { orderId } = useParams()
  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">No orders found!</div>
  }

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"]
    return statuses.indexOf(status) < statuses.indexOf(order?.status || "pending")
  }

  const isCurrent = (status) => order?.status === status

  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Payment processing</h1>
      <div className="mb-8">
        <p className="text-sm text-gray-600">Order Id: {order?.orderId || "pi_3Pt9xwFtTKweNYCilJWdVuT"}</p>
        <p className="text-sm text-gray-600">Status: {order?.status || "pending"}</p>
      </div>

      {/* Horizontal Timeline */}
      <div className="flex justify-between items-start gap-8 px-4">
        {steps.map((step, index) => (
          <TimeLineStep
            key={step.status}
            step={step}
            order={order || {}}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            description={step.description}
          />
        ))}
      </div>
    </div>
  )
}

export default OrderDetails

