import React from 'react'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import { ItemRenderer, ItemPredicate, MultiSelect } from '@blueprintjs/select'


interface HrsaDes {
  id: string;
  designation: string;
  abv: string;
}

const HrsaDesRenderer: ItemRenderer<HrsaDes> = (hrsaDes, { handleClick }) => (
  <MenuItem
    id={hrsaDes.id}
    key={hrsaDes.id}
    label={hrsaDes.abv}
    text={hrsaDes.designation}
    onClick={handleClick}
  />
)

const hrsaDesFilter: ItemPredicate<HrsaDes> = (query, hrsaDes) => {
  return hrsaDes.designation.toLowerCase().indexOf(query.toLowerCase()) >= 0
}

interface Props {
  hrsaDesItems: HrsaDes[];
  selectedHrsaDess: HrsaDes[];
  onItemSelect: () => void;
  onTagRemove: () => void;
}

const HrsaDesSelect = MultiSelect.ofType<HrsaDes>()

const HrsaDesSelector: React.SFC<Props> = (props) => {
  const {
    hrsaDesItems,
    selectedHrsaDess,
    onItemSelect,
    onTagRemove,
  } = props
  return (
    <FormGroup label='HRSA Designation'>
      <HrsaDesSelect
        items={hrsaDesItems}
        itemRenderer={HrsaDesRenderer}
        itemPredicate={hrsaDesFilter}
        selectedItems={selectedHrsaDess}
        tagRenderer={(item) => item.abv}
        onItemSelect={onItemSelect}
        tagInputProps={{
          onRemove: onTagRemove
        }}
        noResults={<MenuItem text='No Results' disabled />}
        fill
      />
    </FormGroup>
  )
}

export default HrsaDesSelector
