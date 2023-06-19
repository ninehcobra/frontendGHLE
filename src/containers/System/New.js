import React, { Component } from 'react';
import { connect } from 'react-redux';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './New.scss'
import { toast } from 'react-toastify'
import { saveNew } from '../../services/userService';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: '',
            contentMarkdown: '',
            contentHTML: '',
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        })
    }

    componentDidMount() {
    }

    checkValidate = () => {
        let isValid = true
        let arrCheck = ['contentHTML', 'contentMarkdown', 'header']
        for (let i = 0; i < arrCheck.length; i++) {
            if (this.state[arrCheck[i]] === '') {
                isValid = false
                toast.warning(`Thiếu thông tin : ${arrCheck[i]}`)
            }
        }
        return isValid
    }

    handleSaveNew = async () => {
        let isValid = this.checkValidate()
        if (isValid) {
            let res = await saveNew({
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                header: this.state.header
            })

            if (res.errCode !== 0) {
                toast.warning(`Tạo tin tức thất bại`)
            }
            else if (res.errCode === 0) {
                toast.success(`Tạo tin mới thành công`)
                this.setState({
                    contentHTML: '',
                    contentMarkdown: '',
                    header: ''
                })
            }
        }

    }

    onChangeHeader = (e) => {
        this.setState({
            header: e.target.value
        })
    }

    render() {
        return (
            <div className>
                <div style={{ margin: '20px' }}>
                    <div className='new-title'>Thêm tin tức</div>
                    <label style={{ fontSize: '14px', fontWeight: 600 }}>Tiêu đề</label>
                    <textarea onChange={(e) => this.onChangeHeader(e)} value={this.state.header} rows={1} className='form-control new-header'></textarea>

                </div>
                <div className='new-body'>
                    <label style={{ fontSize: '14px', fontWeight: 600 }}>Nội dung</label>
                    <MdEditor style={{ height: '500px', zIndex: '11' }} renderHTML={text => mdParser.render(text)} onChange={this.handleEditorChange} />
                </div>
                <div className='save-new'>
                    <button onClick={() => this.handleSaveNew()}> Lưu tin</button>
                </div>



            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(New);








