import { CreditCardIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pricingRule',
  title: 'Pricing Rules',
  type: 'document',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Rule Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., "Christmas Peak Season" or "Weekly Stay Discount"',
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price (GH₵/night)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
      description: 'Base nightly rate for this pricing rule',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Enable or disable this pricing rule',
    }),
    defineField({
      name: 'ruleType',
      title: 'Rule Type',
      type: 'string',
      options: {
        list: [
          { title: 'Seasonal Pricing', value: 'seasonal' },
          { title: 'Length of Stay Discount', value: 'length_discount' },
          { title: 'Last Minute Deal', value: 'last_minute' },
          { title: 'Early Bird Discount', value: 'early_bird' },
          { title: 'Weekend Surcharge', value: 'weekend' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rooms',
      title: 'Apply to Rooms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'roomSimplified' }] }],
      description: 'Leave empty to apply to all rooms',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modifierType',
      title: 'Modifier Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage', value: 'percentage' },
          { title: 'Fixed Amount', value: 'fixed' },
        ],
      },
      initialValue: 'percentage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modifierValue',
      title: 'Modifier Value',
      type: 'number',
      validation: (Rule) => Rule.required(),
      description: 'For percentage: use 10 for 10% increase, -10 for 10% discount. For fixed: amount in GH₵',
    }),
    defineField({
      name: 'minimumStay',
      title: 'Minimum Stay (nights)',
      type: 'number',
      description: 'Require minimum number of nights for this rule to apply',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      initialValue: 0,
      description: 'Higher priority rules are applied first. Use for conflicting rules.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Internal notes about this pricing rule',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      active: 'active',
      type: 'ruleType',
      basePrice: 'basePrice',
      value: 'modifierValue',
      modifierType: 'modifierType',
    },
    prepare({ name, active, type, basePrice, value, modifierType }) {
      const symbol = modifierType === 'percentage' ? '%' : 'GH₵';
      const valueText = value ? (value > 0 ? `+${value}${symbol}` : `${value}${symbol}`) : '';
      const priceText = basePrice ? `GH₵${basePrice}/night` : 'No base price';
      return {
        title: name,
        subtitle: `${priceText} • ${type} • ${valueText ? valueText + ' • ' : ''}${active ? 'Active' : 'Inactive'}`,
      };
    },
  },
});
