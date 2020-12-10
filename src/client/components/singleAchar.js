import React from 'react'
import { connect } from 'react-redux'

class SingleAchar extends React.Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.getAchar(this.props.match.params.id)
    }

    render(){
        return (
            <h3>Single Achar</h3>
        )
    }
}

const mapState = (state) => ({
    achar: state.singleAchar
})

const mapDispatch = (dispatch) => ({
    getAchar: (id) => dispatch(fetchAchar(id))
})


export default connect(mapState, mapDispatch)(SingleAchar)