import { Check, Truck } from "lucide-react"

const TimeLineStep = ({ step, order, isCompleted, isCurrent, isLastStep, description }) => {
  // Get the right icon based on status
  const getStepIcon = () => {
    switch (step.status) {
      case "pending":
        return (
          <div
            className={`w-4 h-4 rounded-full border-2 ${isCompleted || isCurrent ? "border-red-500 bg-red-500" : "border-gray-300 bg-white"}`}
          />
        )
      case "processing":
        return <div className={`w-4 h-4 rounded-full ${isCompleted || isCurrent ? "bg-blue-500" : "bg-gray-300"}`} />
      case "shipped":
        return <Truck className={`w-4 h-4 ${isCompleted || isCurrent ? "text-blue-500" : "text-gray-300"}`} />
      case "completed":
        return <Check className={`w-4 h-4 ${isCompleted || isCurrent ? "text-blue-500" : "text-gray-300"}`} />
      default:
        return null
    }
  }

  return (
    <div className="flex-1 relative">
      <div className="flex items-center justify-center">
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center bg-white">{getStepIcon()}</div>

        {/* Connecting Line */}
        {!isLastStep && (
          <div
            className={`absolute top-2 left-1/2 right-0 h-[1px] ${isCompleted ? "bg-blue-500" : "bg-gray-200"}`}
            style={{ width: "calc(100% - 1rem)" }}
          />
        )}
      </div>

      {/* Content */}
      <div className="mt-3 text-center">
        <h3 className={`text-sm font-medium ${isCompleted || isCurrent ? "text-gray-900" : "text-gray-400"}`}>
          {step.label}
        </h3>
        <time className="block text-xs text-gray-400 mb-1">
          {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : "2/8/2025, 3:52:01 PM"}
        </time>
        <p className={`text-sm ${isCompleted || isCurrent ? "text-gray-600" : "text-gray-400"}`}>{description}</p>
      </div>
    </div>
  )
}

export default TimeLineStep

