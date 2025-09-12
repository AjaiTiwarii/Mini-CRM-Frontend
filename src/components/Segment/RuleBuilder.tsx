import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SegmentRule } from '@/types';

interface RuleBuilderProps {
  rules: SegmentRule[];
  onRulesChange: (rules: SegmentRule[]) => void;
}

const FIELDS = [
  { value: 'totalSpent', label: 'Total Spent (₹)' },
  { value: 'orderCount', label: 'Order Count' },
  { value: 'lastOrderDate', label: 'Last Order Date' },
  { value: 'daysInactive', label: 'Days Inactive' },
];

const OPERATORS = [
  { value: 'gt', label: 'Greater than' },
  { value: 'gte', label: 'Greater than or equal' },
  { value: 'lt', label: 'Less than' },
  { value: 'lte', label: 'Less than or equal' },
  { value: 'eq', label: 'Equal to' },
];

export function RuleBuilder({ rules, onRulesChange }: RuleBuilderProps) {
  const addRule = () => {
    const newRule: SegmentRule = {
      id: `rule_${Date.now()}`,
      field: 'totalSpent',
      operator: 'gt',
      value: '',
      logicalOperator: rules.length > 0 ? 'AND' : undefined
    };
    onRulesChange([...rules, newRule]);
  };

  const updateRule = (index: number, updatedRule: Partial<SegmentRule>) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], ...updatedRule };
    onRulesChange(newRules);
  };

  const removeRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    // Remove logical operator from first rule
    if (newRules.length > 0) {
      newRules[0] = { ...newRules[0], logicalOperator: undefined };
    }
    onRulesChange(newRules);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Segment Rules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.map((rule, index) => (
          <div key={rule.id} className="flex items-center space-x-2 p-4 border rounded-lg">
            {/* Logical Operator */}
            {index > 0 && (
              <select
                value={rule.logicalOperator || 'AND'}
                onChange={(e) => updateRule(index, { logicalOperator: e.target.value as 'AND' | 'OR' })}
                className="px-2 py-1 border rounded text-sm font-medium"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
            )}

            {/* Field */}
            <select
              value={rule.field}
              onChange={(e) => updateRule(index, { field: e.target.value as any })}
              className="px-3 py-2 border rounded"
            >
              {FIELDS.map(field => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>

            {/* Operator */}
            <select
              value={rule.operator}
              onChange={(e) => updateRule(index, { operator: e.target.value as any })}
              className="px-3 py-2 border rounded"
            >
              {OPERATORS.map(op => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>

            {/* Value */}
            <Input
              type={rule.field === 'lastOrderDate' ? 'date' : 'number'}
              value={rule.value}
              onChange={(e) => updateRule(index, { value: e.target.value })}
              placeholder="Value"
              className="w-32"
            />

            {/* Remove Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeRule(index)}
              className="text-red-600"
            >
              Remove
            </Button>
          </div>
        ))}

        <Button onClick={addRule} variant="outline" className="w-full">
          Add Rule
        </Button>
      </CardContent>
    </Card>
  );
}