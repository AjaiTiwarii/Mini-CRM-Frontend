import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateOrder, useCustomers } from '@/hooks/useApi';

interface AddOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddOrderDialog({ open, onClose }: AddOrderDialogProps) {
  const [formData, setFormData] = useState({ customerId: '', amount: '', status: 'completed' });
  const createOrder = useCreateOrder();
  const { data: customersData } = useCustomers();
  const customers = customersData?.customers || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerId || !formData.amount) return;

    try {
      await createOrder.mutateAsync({ ...formData, amount: Number(formData.amount) });
      setFormData({ customerId: '', amount: '', status: 'completed' });
      onClose();
    } catch {
      console.error('Failed to create order');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Order</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-3">
            <div>
              <Label>Customer</Label>
              <Select value={formData.customerId} onValueChange={(v) => setFormData({ ...formData, customerId: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createOrder.isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
