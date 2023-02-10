import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Foot extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <div>大家一起来讨论react</div>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Foot)
