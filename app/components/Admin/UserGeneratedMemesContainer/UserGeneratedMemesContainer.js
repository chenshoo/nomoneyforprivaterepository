import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

// config
import config from 'config/config'

// components
import Button from 'components/Button/Button'
import Title from 'components/Title/Title'
import FormControl from 'components/FormControl/FormControl';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

class UserGeneratedMemesContainer extends React.Component {

    state = {
        memes: {},
        filter: '',
        filterByDevice: null,
    }


    getUserMemes = () => {

        axios.get(`${config.apiBaseUrl}/user-generated-memes`)
            .then(res => {
                this.setState({ memes: res.data })
            })
    }


    clearUserMemes = () => {
        axios.post(`${config.apiBaseUrl}/remove-user-generated-memes`)
        this.setState({ memes: {} })

    }


    render() {

        const { memes, filter, filterByDevice } = this.state;

        let memesToShow = filter ? _.values(memes).filter(meme => _.includes(_.toLower(meme.description), filter)) : memes;

        if (filterByDevice) {
            memesToShow = _.values(memes).filter(meme => meme[filterByDevice]);
        }

        return (
            <div>
                <Button
                    onClick={this.getUserMemes}
                    size="sm"
                    block
                    center
                    bsStyle="success"
                    className="margin-bottom-small"

                >
                    GET THOSE MEMES
                </Button>
                <Button
                    onClick={this.clearUserMemes}
                    size="sm"
                    block
                    center
                    bsStyle="danger"
                >
                    CLEAR THEM ALL
                </Button>
                <select onChange={e => this.setState({ filterByDevice: e.target.value })} value={null}>
                    <option value={''}>All</option>
                    <option value="isMobile">mobile android</option>
                    <option value="isMobileApp">iOs App</option>
                    <option value="isDesktop">Desktop</option>
                </select>

                <Title>({_.size(memesToShow)})</Title>

                <Row className="margin-top-large">
                    <Col xs={10} xsOffset={1} >
                        <FormControl
                            placeholder="Filter memes"
                            className=" center-block"
                            value={this.state.filter}
                            onChange={e => this.setState({ filter: e.target.value })}
                        />
                    </Col>
                </Row>
                <div className="margin-top-large">
                    {_.map(memesToShow, meme => {
                        return (
                            <div key={meme.id} className="box-user-meme margin-top-medium">
                                <img className="img-responsive center-block" src={meme.urlPath}/>
                                <div className="margin-top-medium">
                                    {meme.isMobile && <p>Mobile Device</p>}
                                    {meme.isDesktop && <p>Desktop</p>}
                                    {meme.isMobileApp && <p>iOS Mobile App</p>}
                                </div>
                                <p>{meme.description} </p>
                                <p>Date : {new Date(meme.date) && new Date(meme.date).toDateString()}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}


export default connect(null, {})(UserGeneratedMemesContainer)