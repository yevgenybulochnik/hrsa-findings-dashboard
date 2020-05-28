import React from 'react'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import { ItemRenderer, MultiSelect } from '@blueprintjs/select'


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

interface Props {
  yearItems: AuditYear[];
  selectedYears: AuditYear[];
  onItemSelect: () => void;
}

const YearSelect = MultiSelect.ofType<AuditYear>()

const YearSelector: React.SFC<Props> = (props) => {
  const {
    yearItems,
    selectedYears,
    onItemSelect
  } = props
  return (
    <FormGroup label='Year Filter'>
      <YearSelect
        items={yearItems}
        itemRenderer={YearRenderer}
        selectedItems={selectedYears}
        tagRenderer={(item) => item.year}
        onItemSelect={onItemSelect}
        fill
      />
    </FormGroup>
  )
}

export default YearSelector
