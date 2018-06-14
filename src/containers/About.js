import React from 'react'
import { Anchor, Col, Row } from 'antd'
import './styles/About.css'
import { URLHelper } from '../helpers/URLhelper'
import { HashLink } from 'react-router-hash-link'
import { setDocumentTitle } from '../helpers/utils'
import { CONFIG } from '../config'
import { METAMASK_NETWORKS } from '../constants/metamask'

class About extends React.PureComponent {
  componentDidMount () {
    setDocumentTitle('About')
  }

  render () {
    const etherscanUrl = CONFIG.ETHEREUM_NETWORK === METAMASK_NETWORKS.main
      ? 'etherscan.io'
      : 'rinkeby.etherscan.io'
    return (
      <div>
        <div className="containerWrapper" style={{ marginBottom: 50 }}>
          <div className="container" style={{ fontSize: 17 }}>
            <h2><b>TL;DR</b></h2>
            <ul>
              <li><h3>Paint any pixels you want on any available canvas.</h3></li>
              <li><h3>The more you paint, the bigger share of the painting you get.</h3></li>
              <li>
                <h3>After all pixels are set, the canvas is put up for auction. Anyone can make a bid.</h3>
              </li>
              <li>
                <h3>96.1% of the winning bid from auction is distributed to the painters.<br/>
                  If you painted half of the canvas, you'll get 50% of that.</h3>
              </li>
              <li>
                <h3>Every time the canvas is traded, 6.1% of the transaction value is distributed again to its painters.<br/>
                  If you painted half of the canvas, you'll get 50% of that.</h3>
              </li>
            </ul>
          </div>
        </div>
        <Row className="container About">
          <Col xs={24} sm={24} md={8} className="About__nav">
            <Anchor>
              {/*<Anchor.Link href="#introduction" title="Introduction" />*/}
              <Anchor.Link href="#what-is-cryptocanvas" title="What is CryptoCanvas?" />
              <Anchor.Link href="#how-does-it-work" title="How does it work?">
                <Anchor.Link href="#painting" title="I. Painting" />
                <Anchor.Link href="#initial-bidding" title="II. Initial Bidding" />
                <Anchor.Link href="#trading" title="III. Trading" />
              </Anchor.Link>
              <Anchor.Link href="#how-can-i-participate" title="How can I participate?" />
              <Anchor.Link href="#how-much-does-it-cost" title="How much does it cost?" />
              <Anchor.Link href="#withdrawing-rewards-and-profits" title="Withdrawing Rewards and Profits" />
              <Anchor.Link href="#how-do-you-calculate-rewards" title="How do you calculate Rewards for painting?" />
              <Anchor.Link href="#what-is-stored-on-the-blockchain" title="What is stored on the blockchain?" />
              <Anchor.Link href="#is-the-number-of-canvases-limited" title="Is the number of canvases limited?" />
              <Anchor.Link href="#who-holds-copyright-to-a-canvas" title="Who holds copyright to a canvas?" />
              <Anchor.Link href="#is-the-code-open-source" title="Is the code open-source?" />
            </Anchor>
          </Col>
          <Col xs={24} sm={24} md={16}>
            {/*<h2 id="introduction"><b>Introduction</b></h2>*/}
            {/*<p>*/}
              {/*CryptoCanvas was inspired from the combination of two ideas. The first being some of the amazing projects*/}
              {/*that*/}
              {/*already exist on the Ethereum blockchain, such as <a*/}
              {/*href="https://www.larvalabs.com/cryptopunks" target="_blank"*/}
              {/*rel="noopener noreferrer">CryptoPunks</a> and <a*/}
              {/*href="https://cryptokitties.co" target="_blank" rel="noopener noreferrer">CryptoKitties</a>. The second*/}
              {/*being*/}
              {/*the famous <a href="https://redditblog.com/2017/04/18/place-part-two/" target="_blank"*/}
                            {/*rel="noopener noreferrer">Reddit Place</a> experiment where artwork was generated*/}
              {/*collectively*/}
              {/*by the community.*/}
            {/*</p>*/}

            {/*<p>*/}
              {/*CryptoPunks and CryptoKitties are certainly very successful projects, but they are not without their*/}
              {/*flaws.*/}
              {/*They rely on the functionality of the creators' servers because only some of the data, the ID or DNA*/}
              {/*numbers,*/}
              {/*is stored on the blockchain. In these projects, the data stored on the blockchain must be interpreted by*/}
              {/*the*/}
              {/*creators' servers. CryptoCanvas has no such limitations. All the information about the CryptoCanvas*/}
              {/*artwork is*/}
              {/*stored on the blockchain&mdash;that means every single pixel of the canvas and every transaction ever*/}
              {/*made.*/}
              {/*Such*/}
              {/*information is open and available to be interpreted by anyone, which means CryptoCanvas is a fully*/}
              {/*decentralized app, completely independent of our servers.*/}
            {/*</p>*/}

            {/*<p>*/}
              {/*In short, CryptoCanvas solves one of the biggest limitations of numerous decentralized apps by storing all*/}
              {/*the*/}
              {/*canvas data on the blockchain, and it does this while also implementing the collective creative potential*/}
              {/*of*/}
              {/*communities that was discovered and took on a mind of its own in the Reddit Place experiment.*/}
            {/*</p>*/}


            <h2 id="what-is-cryptocanvas"><b>What is CryptoCanvas?</b></h2>

            <p>CryptoCanvas is a limited set of collectible 48x48 pixel artworks to-be-created by the CryptoCanvas
              community.
              Each canvas has multiple authors, who create a unique piece of art by collaborating together. Completed
              artworks are put up for auction and when their first price is determined, it is evenly distributed across
              all of the authors, depending on how many pixels they have set.</p>

            <h2 id="how-does-it-work"><b>How does it work?</b></h2>

            <p>A canvas can be in one of three states:</p>

            <h3 id="painting"><b>I. Painting</b></h3>
            <p>A canvas is being painted as long as there is still at least one pixel without a color. You can place a
              pixel of any color on any empty space of the canvas. You can't paint over already painted pixels.</p>

            <h3 id="initial-bidding"><b>II. Initial Bidding</b></h3>
            <p>A canvas enters Initial Bidding mode when all of its pixels have their colors selected.</p>

            <p>In the real world, when an artist finishes an artwork, she offers it for sale. CryptoCanvas has the same
              principle - the only difference is that it has many authors instead of one.</p>

            <p>To determine its first owner, the canvas is put up for auction and anyone can make a bid.
              Once the first bid on the canvas is placed, a clock starts to count down the
              remaining time for bidding. Other users willing to make a bid will have only 48 hours to do so. After this time, a
              bidder with the last, highest bid becomes the sole owner of the canvas. Amount of Ether from the bid is
              evenly distributed to all the authors of the canvas, based on how many pixels appearing on the completed artwork
              they placed. The more pixels were painted by you, the bigger will be your reward!</p>

            <h3 id="trading"><b>III. Trading</b></h3>
            <p>Once a canvas has an owner, it can be traded in the "Marketplace".</p>
            <ul>
              <li>
                <b>Buy Offer</b> - users willing to buy the canvas can offer some amount of Ether for it. The canvas'
                owner can then accept it if the amount specified is satisfactory.
              </li>
              <li>
                <b>Sell Offer</b> - the canvas' owner can offer it for sale for any amount of Ether. Other users can
                accept the offer and buy the canvas.
              </li>
            </ul>

            <p>
              <b>Each time a canvas is sold, 6.1% of the transaction value is distributed
                again to the painters of the canvas.</b>
            </p>

            <p>In both cases, after accepting Buy Offer by the owner or Sell Offer by a user, the ownership is
              transferred to the buyer automatically.</p>

            <h2 id="how-can-i-participate"><b>How can I participate?</b></h2>

            <p>CryptoCanvas is based on the Ethereum blockchain technology. To get started you need:</p>

            <ul>
              <li>a desktop version of Chrome or Firefox</li>

              <li>
                MetaMask - a browser extension allowing you to interact with the blockchain,
                see <HashLink to={URLHelper.help.installingMetamask}>Installing MetaMask</HashLink>
              </li>

              <li>
                Ether - a digital cryptocurrency powering transactions like painting or trading,
                see <HashLink to={URLHelper.help.gettingEther}>Getting Ether</HashLink>
              </li>
            </ul>

            <h2 id="how-much-does-it-cost"><b>How much does it cost?</b></h2>

            <p>Essentially, it's free. We don't charge any fees for creating canvases, placing pixels or making bids.
              The only thing you need to cover is a transaction fee required by the Ethereum network.</p>

            <p>We take a small commission of <b>3.9%</b> from the final highest bid after Initial Bidding is finished
              and
              from each successful trading transaction (accepted Buy or Sell offer) in the "Marketplace".</p>

            <h2 id="withdrawing-rewards-and-profits"><b>Withdrawing Rewards and Profits</b></h2>

            <p>Because of the Ethereum platform security guidelines, rewards for painting and profits from trading are
              not
              transferred to your wallet automatically. Instead, they are added to your Account Balance on the
              CryptoCanvas
              Ethereum Contract. The Contract is publicly available and is completely independent of the
              CryptoCanvas.art
              website, so you don't need to worry about your funds. They will be stored in the Contract forever waiting
              for
              you to withdraw them.</p>

            <p>All of your profits from selling canvases, Ethers from unsuccessful bids and canceled Buy Offers are
              added to
              your Account Balance automatically. You can withdraw your Balance to your wallet at any time by using the
              "Withdraw" button on the <b>My Account</b> page.</p>

            <p>The only thing not stored in your Balance automatically are your rewards for painting. In order to
              withdraw
              them, you need to enter the page of the finished canvas on which you have painted, and press "Add to my
              Account Balance" button. This operation will check how many pixels of the canvas were painted by
              you,
              calculate your reward based on the canvas price from auction and trading history,
              and add the total value to your Balance. From there you will be able to withdraw it as described before.</p>

            <h2 id="how-do-you-calculate-rewards"><b>How do you calculate Rewards for painting?</b></h2>
            <p>The reward is evenly distributed across all the painters, based on how many pixels of the canvas they have painted.</p>
            <p><b>Painters Reward consists of:
              <ul>
                <li>96.1% from the winning bid in the Initial Bidding phase</li>
                <li>6.1% from each trading transaction (when a canvas is sold)</li>
              </ul></b></p>
            <p><i><b>Example 1:</b><br />
              The canvas was sold during Initial Bidding for 1 ETH. Painters will receive 0.961 ETH (96.1%) to share.
              If you painted 1152 pixels&mdash;that is half the pixels of the canvas&mdash;you
              would be rewarded 0.4805 ETH, which is 50% of the total reward value.</i></p>
            <p><i><b>Example 2:</b><br />
              Owner of the Canvas sold it to another person for 2 ETH. Painters will receive 6.1% of that value to share,
              which is {0.061 * 2} ETH. If you painted 1152 pixels&mdash;that is half the pixels of the canvas&mdash;you
              would be rewarded {0.5 * 0.061 * 2} ETH, which is 50% of the total reward value.</i></p>

            <h2 id="what-is-stored-on-the-blockchain"><b>What is stored on the blockchain?</b></h2>
            <p>
              To put it simply: <b>everything</b>. Unlike other projects, we store all pieces of information on the
              blockchain. That includes information about every single pixel of the canvas and its author.
              Storing this amount of data on the blockchain would be very expensive for one person, but with the
              collaborative effort, it becomes possible.
            </p>

            <h2 id="is-the-number-of-canvases-limited"><b>Is the number of canvases limited?</b></h2>
            <p>Yes, the total number of canvases is limited to 1000. However, maximum 12 canvases can be active at the
              same
              time.</p>

            <h2 id="who-holds-copyright-to-the-canvases"><b>Who holds copyright to a canvas?</b></h2>
            <p>
              Each finished canvas has its owner, determined during the Initial Bidding phase. The current owner holds
              all
              copyright to the canvas. Once the owner transfers the ownership of the canvas to another user, the
              copyright
              is passed to the new owner along with the canvas.
            </p>
            <p>CryptoCanvas fans are able to use images of the canvases in non-commercial purposes.</p>

            <h2 id="is-the-code-open-source"><b>Is the code open-source?</b></h2>
            <p>
              Yes! All of the CryptoCanvas code is available for everyone at
              our <a href="https://github.com/TheMindhouse/cryptocanvas-solidity" target="_blank" rel="noopener noreferrer">
              GitHub page</a>.
            </p>
            <p>Smart Contract is also verified and available
              at <a href={`https://${etherscanUrl}/address/${CONFIG.CONTRACT_ADDRESS}`} target="_blank"
                    rel="noopener noreferrer">Etherscan</a>.
            </p>

            <p>
              Because CryptoCanvas is open-source and all the data is stored on the
              blockchain, <b>the canvases will never disappear and everyone will be able to interact
              with them forever</b>!
              Even if our servers were down, the canvases would always be there, on the blockchain,
              available to be read by anyone. You are free to create your own website to interact with
              the CryptoCanvas Smart Contract.
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export default About
