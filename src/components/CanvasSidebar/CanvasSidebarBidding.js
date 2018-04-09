// @flow
import React from 'react'
import { Divider } from 'antd'
import HighestBid from './HighestBid'
import SubmitBid from './SubmitBid'
import BiddingTimeLeft from './BiddingTimeLeft'
import { Modal } from 'antd/lib/index'
import withWeb3 from '../../hoc/withWeb3'
import { Bid } from '../../models/Bid'
import { ContractModel } from '../../models/ContractModel'
import { LocalStorageManager } from '../../localStorage'

type Props = {
  canvasId: number,
  highestBid?: Bid,
  //  withWeb3
  web3: Object,
  account: string,
  Contract: ContractModel,
}

const CanvasSidebarBidding = (props: Props) => {
  const submitBid = (bidAmountInEth) => {
    const bidAmountInWei = props.web3.toWei(bidAmountInEth, 'ether')
    console.log(`User posting new bid: ${bidAmountInEth} (${bidAmountInWei} Wei)`)

    props.Contract.makeBid({ canvasId: props.canvasId, bidAmountInWei })
      .then(transaction => {
        LocalStorageManager.transactions.updateTransactions(transaction)
        Modal.success({
          title: 'Make a Bid Transaction sent',
          content: 'It will be visible for others in a few minutes, after the blockchain updates.',
        })
      })
  }
  
  const isUserHighestBidder = props.highestBid && props.account === props.highestBid.bidder

  const highestBidAmount = props.highestBid ? parseFloat(props.web3.fromWei(props.highestBid.amount, 'ether')) : null

  return (
    <div className="CanvasSidebar">
      <h2 className="CanvasSidebar__title">Canvas #{props.canvasId}</h2>
      <h3 className="CanvasSidebar__status">Initial Bidding</h3>

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
              highestBidAmount={highestBidAmount} />
            <Divider />
          </div>
      }

      <BiddingTimeLeft
        biddingFinishTime={props.highestBid ? props.highestBid.finishTime : null}
        />
    </div>
  )
}

CanvasSidebarBidding.defaultProps = {
  highestBid: {},
}

export default withWeb3(CanvasSidebarBidding)
