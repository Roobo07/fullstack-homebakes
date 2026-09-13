'use client';

interface OrderTimelineProps {
  currentStep: number; // 0-based index
  isDelivery?: boolean;
}

export default function OrderTimeline({ currentStep, isDelivery = true }: OrderTimelineProps) {
  const allSteps = [
    { title: 'Order Placed', icon: 'M5 13l4 4L19 7' },
    { title: 'Payment Confirmed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Order Confirmed', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { title: 'Preparing', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
    { title: 'Ready', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    ...(isDelivery ? [{ title: 'Out for Delivery', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' }] : []),
    { title: isDelivery ? 'Delivered' : 'Picked Up', icon: 'M5 13l4 4L19 7' }
  ];

  return (
    <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-8 py-4">
      {allSteps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <div key={index} className="relative flex items-center mb-8 last:mb-0">
            <div className={`absolute -left-[33px] md:-left-[35px] w-8 h-8 rounded-full flex items-center justify-center border-4 border-white ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} />
              </svg>
            </div>
            
            <div className="ml-6">
              <h4 className={`font-semibold text-lg ${isCompleted ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.title}
              </h4>
              {isCompleted && (
                <p className="text-sm text-gray-400 mt-1">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              )}
              {isCurrent && (
                <p className="text-sm text-blue-500 mt-1">In progress...</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
