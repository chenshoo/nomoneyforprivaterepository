import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

// config
import config from 'config/config'

// components
import Button from 'components/Button/Button'
import Title from 'components/Title/Title'
import Text from 'components/Text/Text'

class UserGeneratedMemesContainer extends React.Component {

    state = {
        memes: {},
        filter: null
    }


    getSuggestedMemes = () => {

        axios.get(`${config.apiBaseUrl}/user-suggested-memes`)
            .then(res => {
                this.setState({ memes: res.data })
            })
    }

    removeSuggestedMemes = () => {
        axios.delete(`${config.apiBaseUrl}/user-suggested-memes`)
            .then(res => {
                this.setState({ memes: [] })
            })
    }

    render() {

        const { memes, filter } = this.state

        const memesToShow = filter ? _.values(memes).filter(meme => meme[filter]) : memes

        return (
            <div>
                <Button
                    onClick={this.getSuggestedMemes}
                    size="sm"
                    block
                    center
                    bsStyle="success"
                    className="margin-bottom-small"

                >
                    GET THOSE MEMES
                </Button>
                <Button
                    onClick={this.removeSuggestedMemes}
                    size="sm"
                    block
                    center
                    bsStyle="danger"
                    className="margin-bottom-small margin-top-small"

                >
                    Clear Memes
                </Button>
                <Title>({_.size(memesToShow)})</Title>

                <div className="margin-top-large">
                    {_.map(memesToShow, meme => (
                        <div key={meme.id} className="box-user-meme margin-top-medium">
                            <img className="img-responsive center-block" src={meme.urlPath}/>
                            <Text theme="black" align="center" >
                                {_.get(meme, 'description')}
                            </Text>
                            <Text theme="black"  align="center" >
                                {_.get(meme, 'name')}
                            </Text>
                            <Text theme="black"  align="center" >
                                {_.get(meme, 'email')}
                            </Text>
                        </div>
                    ))}

                </div>
            </div>
        )
    }
}


export default connect(null, {})(UserGeneratedMemesContainer)