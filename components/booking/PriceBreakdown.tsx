'use client';

interface PricingData {
  roomTitle: string;
  nights: number;
  baseRate: number;
  basePrice: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  total: number;
  appliedRules?: Array<{
    name: string;
    type: string;
    value: number;
  }>;
}

interface PriceBreakdownProps {
  pricing: PricingData;
  loading?: boolean;
}

export function PriceBreakdown({ pricing, loading = false }: PriceBreakdownProps) {
  if (loading) {
    return (
      <div className="border-t border-b border-neutral-200 py-4 space-y-2 animate-pulse">
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
        <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="border-t border-b border-neutral-200 py-4 space-y-3">
      <h3 className="font-semibold text-dark mb-3">Price Breakdown</h3>
      
      {/* Base Price */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-neutral-600">
          GH₵{pricing.baseRate} × {pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'}
        </span>
        <span className="font-medium">GH₵{pricing.basePrice.toLocaleString()}</span>
      </div>

      {/* Applied Discounts/Surcharges */}
      {pricing.appliedRules && pricing.appliedRules.length > 0 && (
        <div className="space-y-2 text-sm">
          {pricing.appliedRules.map((rule, index) => (
            <div key={index} className="flex justify-between items-center text-green-700">
              <span className="flex items-center gap-1">
                {rule.value < 0 ? '🎉' : '📈'} {rule.name}
              </span>
              <span className="font-medium">
                {rule.type === 'percentage' 
                  ? `${rule.value > 0 ? '+' : ''}${rule.value}%`
                  : `${rule.value > 0 ? '+' : ''}GH₵${Math.abs(rule.value)}`
                }
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Cleaning Fee */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-neutral-600">Cleaning fee</span>
        <span className="font-medium">GH₵{pricing.cleaningFee.toLocaleString()}</span>
      </div>

      {/* Service Fee */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-neutral-600">Service fee</span>
        <span className="font-medium">GH₵{pricing.serviceFee.toLocaleString()}</span>
      </div>

      {/* Taxes */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-neutral-600">Taxes (VAT 12.5%)</span>
        <span className="font-medium">GH₵{pricing.taxes.toLocaleString()}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center font-bold text-base pt-3 mt-3 border-t border-neutral-200">
        <span className="text-dark">Total</span>
        <span className="text-orange text-xl">GH₵{pricing.total.toLocaleString()}</span>
      </div>
    </div>
  );
}
