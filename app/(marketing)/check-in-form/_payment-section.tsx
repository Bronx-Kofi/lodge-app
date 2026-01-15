'use client';

import React from 'react';

type PaymentDeclaration = 'paid_telecel' | 'not_paid';

export function PaymentSection({
  formData,
  setFormData,
}: {
  formData: {
    paymentDeclaration: PaymentDeclaration;
    telecelPaymentNumber: string;
    telecelTransactionId: string;
    amountPaid: number;
    paymentNotes: string;
  };
  setFormData: (data: any) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200">
        <div className="w-10 h-10 bg-orange text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-sm">
          5
        </div>
        <div>
          <h2 className="text-xl font-bold text-dark">Payment Status</h2>
          <p className="text-sm text-neutral-500">Select whether you have already paid</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-sm text-neutral-800">
          <div className="font-semibold">Telecel Cash payment number</div>
          <div className="mt-1 text-lg font-bold tracking-wide">0201449457</div>
          <div className="mt-1 text-xs text-neutral-600">
            If you paid, please use the fields below to enter the transaction reference and the number you sent from.
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-2">
            Payment Status
          </label>
          <select
            value={formData.paymentDeclaration}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentDeclaration: e.target.value as PaymentDeclaration,
              })
            }
            className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none bg-white"
          >
            <option value="not_paid">No, I have not paid yet</option>
            <option value="paid_telecel">Yes, I have paid via Telecel Cash</option>
          </select>
        </div>

        {formData.paymentDeclaration === 'paid_telecel' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Sender Number (Number you sent from)
              </label>
              <input
                type="text"
                value={formData.telecelPaymentNumber}
                onChange={(e) => setFormData({ ...formData, telecelPaymentNumber: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                placeholder="Telecel number used for payment"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Transaction ID / Reference
              </label>
              <input
                type="text"
                value={formData.telecelTransactionId}
                onChange={(e) => setFormData({ ...formData, telecelTransactionId: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                placeholder="e.g., T123456789"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Amount Paid (GH)
              </label>
              <input
                type="number"
                min={0}
                value={formData.amountPaid}
                onChange={(e) => setFormData({ ...formData, amountPaid: Number(e.target.value) })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Payment Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.paymentNotes}
                onChange={(e) => setFormData({ ...formData, paymentNotes: e.target.value })}
                className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                placeholder="e.g., Sender name"
              />
            </div>
          </div>
        )}

        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-sm text-neutral-700">
          If you have not paid yet, your receipt will still show the total amount and reservation confirmation.
        </div>
      </div>
    </div>
  );
}
