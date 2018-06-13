// @flow
import React from 'react'
import { Divider } from 'antd'
import HighestBid from './HighestBid'
import SubmitBid from './SubmitBid'
import BiddingTimeLeft from './BiddingTimeLeft'
import { message } from 'antd/lib/index'
import withWeb3 from '../../hoc/withWeb3'
import { Bid } from '../../models/Bid'
import { ContractModel } from '../../models/ContractModel'
import { LocalStorageManager } from '../../localStorage'
import { CanvasPainters } from './CanvasPainters'

type Props = {
  canvasId: number,
  highestBid?: Bid,
  isCanvasLoading: boolean,
  //  withWeb3
  web3: Object,
  account: string,
  Contract: ContractModel,
}

const CanvasSidebarBidding = (props: Props) => {
  const submitBid = (bidAmountInEth) => {
    const bidAmountInWei = props.web3.toWei(bidAmountInEth, 'ether')
    // console.log(`User posting new bid: ${bidAmountInEth} (${bidAmountInWei} Wei)`)

    props.Contract.makeBid({ canvasId: props.canvasId, bidAmountInWei })
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        message.success('Make a Bid Transaction sent')
      })
  }
  
  const isUserHighestBidder = props.highestBid && props.account === props.highestBid.bidder

  const highestBidAmount = props.highestBid ? parseFloat(props.web3.fromWei(props.highestBid.amount, 'ether')) : null

  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      <h3 className="CanvasSidebar__status">Initial Bidding</h3>

      <CanvasPainters
        canvasId={props.canvasId}
        isCanvasLoading={props.isCanvasLoading}
        isCanvasFinished={true}
      />

      <Divider />

      <HighestBid
        isUserHighestBidder={isUserHighestBidder}
        highestBidAmount={highestBidAmount}
        highestBidAddress={props.highestBid ? props.highestBid.bidder : null} />

      <Divider />

      {
        props.account &&
          <div>
            <SubmitBid
              submitBid={submitBid}
              highestBidAmount={highestBidAmount}
              canvasId={props.canvasId}
            />
            <Divider />
          </div>
      }

      <BiddingTimeLeft
        biddingFinishTime={props.highestBid ? props.highestBid.finishTime : null}
        />

      <Divider />

    </div>
  )
}

CanvasSidebarBidding.defaultProps = {
  highestBid: {},
}

export default withWeb3(CanvasSidebarBidding)
