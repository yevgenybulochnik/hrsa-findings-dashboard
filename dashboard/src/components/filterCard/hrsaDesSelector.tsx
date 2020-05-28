import React from 'react'
import { MenuItem, FormGroup } from '@blueprintjs/core'
import { ItemRenderer, MultiSelect } from '@blueprintjs/select'


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

interface Props {
  hrsaDesItems: HrsaDes[];
  selectedHrsaDess: HrsaDes[];
  onItemSelect: () => void;
}

const HrsaDesSelect = MultiSelect.ofType<HrsaDes>()

const HrsaDesSelector: React.SFC<Props> = (props) => {
  const {
    hrsaDesItems,
    selectedHrsaDess,
    onItemSelect
  } = props
  return (
    <FormGroup label='HRSA Designation'>
      <HrsaDesSelect
        items={hrsaDesItems}
        itemRenderer={HrsaDesRenderer}
        selectedItems={selectedHrsaDess}
        tagRenderer={(item) => item.abv}
        onItemSelect={onItemSelect}
        fill
      />
    </FormGroup>
  )
}

export default HrsaDesSelector
