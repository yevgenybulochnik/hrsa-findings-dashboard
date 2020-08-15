import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { SummaryChart, SummaryPie, FilterCard } from '../components/summaryChart'
import { RootState } from '../rootReducer'

const SideBar = styled.div``

const PieContainer = styled.div``

const BarChartContainer = styled.div``


const Container = styled.div`
  ${SideBar}, ${PieContainer}, ${BarChartContainer} {
    > * {
      margin-bottom: 1em;
    }
  }

  @media(min-width: 1175px) {
    margin: 1em;
    display: grid;
    grid-template-columns: 3fr 8fr;
    grid-template-rows: auto;
    grid-template-areas:
      "sidebar piecharts"
      "barcharts barcharts";

    ${SideBar} {
      grid-area: sidebar;
      padding-top: 3em;
    }

    ${PieContainer} {
      > * {
        width: 400px;
      }
      justify-content: space-around;
      display: flex;
      grid-area: piecharts;
    }

    ${BarChartContainer} {
      grid-area: barcharts;
    }
  }
`

interface Props {
  pieData1: any;
  pieData2: any;
}

const Overview: React.SFC<Props> = (props) => {
  const {
    pieData1,
    pieData2,
  } = props

  return (
    <Container>
      <SideBar>
        <FilterCard />
      </SideBar>
      <BarChartContainer>
        <SummaryChart />
      </BarChartContainer>
      <PieContainer>
        <SummaryPie data={pieData1} />
        <SummaryPie data={pieData2} />
      </PieContainer>
    </Container>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    pieData1: state.summaryChart.summaryFindingsData.summary,
    pieData2: state.summaryChart.summaryFindingsData.totals
  }
}

export default connect(mapStateToProps, {})(Overview)
