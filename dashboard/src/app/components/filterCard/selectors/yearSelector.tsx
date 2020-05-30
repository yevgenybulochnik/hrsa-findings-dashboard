import React from 'react'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import { ItemRenderer, ItemPredicate, MultiSelect } from '@blueprintjs/select'


interface AuditYear {
  id: string;
  year: string;
}

const YearRenderer: ItemRenderer<AuditYear> = (auditYear, { handleClick }) => (
  <MenuItem
    id={auditYear.id}
    key={auditYear.id}
    label={auditYear.year}
    text='Audit Year'
    onClick={handleClick}
  />
)

const yearFilter: ItemPredicate<AuditYear> = (query, auditYear) => {
  return auditYear.year.toLowerCase().indexOf(query.toLowerCase()) >= 0
}

interface Props {
  yearItems: AuditYear[];
  selectedYears: AuditYear[];
  onItemSelect: () => void;
  onTagRemove: () => void;
}

const YearSelect = MultiSelect.ofType<AuditYear>()

const YearSelector: React.SFC<Props> = (props) => {
  const {
    yearItems,
    selectedYears,
    onItemSelect,
    onTagRemove,
  } = props
  return (
    <FormGroup label='Year Filter'>
      <YearSelect
        items={yearItems}
        itemRenderer={YearRenderer}
        itemPredicate={yearFilter}
        selectedItems={selectedYears}
        tagRenderer={(item) => item.year}
        onItemSelect={onItemSelect}
        tagInputProps={{
          onRemove: onTagRemove
        }}
        fill
        noResults={<MenuItem text='No Results' disabled />}
      />
    </FormGroup>
  )
}

export default YearSelector
