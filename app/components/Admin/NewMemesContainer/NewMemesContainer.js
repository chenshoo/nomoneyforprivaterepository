import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

import Dropzone from 'components/DropZone/DropZone';
import Button from 'components/Button/Button';
import Title from 'components/Title/Title';
import Editor from 'components/Admin/Editor/Editor';

// helpers
import { blobToString } from 'containers/Generator/generator-helpers';
import helpers from 'helpers/helpers';

// actions
import { saveNewMeme } from 'actions/admin-actions/admin-actions';


class NewMemesContainer extends React.Component {

    state = {

    }

    getThumbnail(urlPath) {
        return new Promise(resolve => {
            const canvas = document.createElement('CANVAS')
            const context = canvas.getContext("2d")
            const img = new Image()
            img.onload = function () {
                const scale = 0.5
                img.width = parseInt(img.width) * scale
                img.height = parseInt(img.height) * scale

                canvas.height = parseInt(img.height) * scale
                canvas.width = parseInt(img.width) * scale
                context.drawImage(img, 0, 0, parseInt(img.width) * scale, parseInt(img.height) * scale)

                resolve(canvas.toDataURL("image/jpeg"))
            }
            img.src = urlPath
        })


    }

    handleFileSelect = async (selectedFiles) => {
        const promisesToBase64 = _.map(selectedFiles,file => blobToString({ blob: file }) );

        Promise.all(promisesToBase64).then(images => {
            const promises = _.map(images, image => this.createMemeObj(image));

            Promise.all(promises).then(memes => {
                _.forEach(memes, meme => {
                    const id = _.uniqueId();
                    this.setState({
                        memes: { ...this.state.memes, [id]: { ...meme, id} },
                        editMode: false,
                        userMemes: false
                    })
                })
            })

        })

    }

    async createMemeObj(base64) {
        const thumb = await this.getThumbnail(base64)
        return {
            urlPath: base64,
            thumbPath: thumb
        }
    }

    render() {

        return(
            <div>
                <Button
                    onDrop={this.handleFileSelect}
                    size="sm"
                    componentClass={Dropzone}
                    center
                    multiple
                    block
                    bsStyle="success"
                >
                    upload
                </Button>

                {_.map(this.state.memes, meme => (
                    <Editor
                        meme={meme}
                        index={meme.id}
                        saveMeme={this.props.saveNewMeme}
                    />
                ))}
            </div>
        )
    }
}

export default connect(null, { saveNewMeme })(NewMemesContainer);