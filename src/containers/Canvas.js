import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'

import { ABI } from '../helpers/ABI'

import canvasBg from '../assets/images/bg.png'
import CanvasPixel from '../components/CanvasPixel'

const Web3 = window.Web3

const convertColorToRGB = (color) => {
  const red = Math.round(((color & 0xE0) >>> 5) / 7.0 * 255.0)
  const green = Math.round(((color & 0x1C) >>> 2) / 7.0 * 255.0)
  const blue = Math.round((color & 0x03) / 3.0 * 255.0)

  return `rgb(${red}, ${green}, ${blue})`
}

class Canvas extends React.Component {
  pixelSize = 14

  constructor () {
    super()
    this.state = {
      pixels: [],
      isLoading: true,
    }
  }

  componentDidMount () {
    console.log('what is web3 right now: ', window.web3)

    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    }

    console.log(window.web3)
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
    console.log('defaultAccount', window.web3.eth.defaultAccount)

    const ContractInstance = window.web3.eth.contract(ABI)

    const CanvasContract = ContractInstance.at('0x7b5ef02d50b53be2d591bf2f07919abe73019098')
    console.log(CanvasContract)
    window.CanvasContract = CanvasContract

    CanvasContract.getArtwork(0, {gas: 3000000}, (error, result) => {
      if (!error) {
        const pixelsRGB = result.map(color => convertColorToRGB(color))
        this.setState({
          pixels: pixelsRGB,
          isLoading: false,
        })
      }
      else {
        console.error(error)
        this.setState({
          isLoading: false,
        })
      }
    })
  }

  render () {
    const gridCols = Math.sqrt(this.state.pixels.length)
    const canvasSize = gridCols * this.pixelSize
    return (
      <div>
        <h2>Canvas</h2>
        {this.state.isLoading && <p>Canvas loading...</p>}
        <Stage width={canvasSize} height={canvasSize} style={{'background': `url(${canvasBg})`, 'backgroundSize': this.pixelSize, 'width': canvasSize}}>
          <Layer>
            {
              this.state.pixels.map((color, index) =>
                <CanvasPixel
                    color={color}
                    index={index}
                    pixelSize={this.pixelSize}
                    gridCols={gridCols}
                    onClick={this.handlePixelClick}
                  />
              )
            }

          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Canvas
