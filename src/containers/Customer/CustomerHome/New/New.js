import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './New.scss'
import Header from '../../../HomePage/Header'
import { getNewById } from '../../../../services/userService';
import { getNew } from '../../../../services/userService';
import HomeFooter from '../../../HomePage/HomeFooter';
class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            new: [],
            news: [],
            lastNew: {},
        }
    }

    async componentDidMount() {
        let news = (await getNew(10)).data
        let lastNew = news.reverse().shift()
        this.setState({
            news: news,
            lastNew: lastNew
        })


        let res = await getNewById(this.props.match.params.id)
        this.setState({
            new: res.data
        })


    }

    getDate = (string) => {
        const date = new Date(string);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;

        return formattedDate
    }



    render() {

        return (
            <>
                <Header></Header>
                {this.state.new.header ? <>
                    <nav aria-label="breadcrumb">

                        <ol className="breadcrumb">
                            <div className='container' style={{ display: 'flex' }}>
                                <li className="breadcrumb-item " ><a className='breadcrumb-news' href="/home">Trang chủ</a></li>
                                <li style={{ textTransform: 'lowercase' }} className="breadcrumb-item active" aria-current="page">{this.state.new ? this.state.new.header : ''}</li>
                            </div>
                        </ol>
                    </nav>
                    <div className='container'>
                        <div className='heading-new'>
                            <h1>{this.state.new.header}</h1>
                        </div>

                        <div dangerouslySetInnerHTML={{ __html: this.state.new.contentHTML }} className='content-new'>

                        </div>
                    </div>
                </> :


                    <>
                        <nav aria-label="breadcrumb">

                            <ol className="breadcrumb">
                                <div className='container' style={{ display: 'flex' }}>
                                    <li className="breadcrumb-item " ><a className='breadcrumb-news' href="/home">Trang chủ</a></li>
                                    <li style={{ textTransform: 'lowercase' }} className="breadcrumb-item active" aria-current="page">Tin tức GHLE</li>
                                </div>
                            </ol>
                        </nav>

                        <div className='container'>
                            <div className='row blog-wrapper'>
                                <div className='col-md-12 col-sm-12 col-xs-12'>
                                    <div className='blog-header'>TIN TỨC GHLE</div>
                                    <div className='blog-content'>
                                        <div className='blog-posts'>
                                            <div className='row'>
                                                <div className='col-lg-7 col-md-7 col-sm-12 blog-col-left'>
                                                    <div className='blog-item'>
                                                        <div className='blog-img'>
                                                            <a href={`/news/${this.state.lastNew.id}`}>
                                                                <img src={this.state.lastNew.banner}></img>
                                                            </a>
                                                        </div>

                                                        <div className='blog-detail'>
                                                            <h3 className='blog-title'>
                                                                <a href={`/news/${this.state.lastNew.id}`}>[THÔNG BÁO] - {this.state.lastNew.header}</a>
                                                            </h3>
                                                            <div className='blog-date'>
                                                                <span className='date'>
                                                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <i className="fa fa-calendar"></i>

                                                                        <div>{this.state.lastNew.updatedAt ? (
                                                                            this.getDate(this.state.lastNew.updatedAt)

                                                                        ) : ''}</div>


                                                                    </span>

                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-lg-5 col-md-5 col-sm-12 blog-col-right'>
                                                    <div className='row'>
                                                        {/* Them bai o day */}
                                                        {this.state.news.map((item, index) => {
                                                            return (
                                                                <div className='col-lg-12 col-md-12 col sm-12' style={{ marginBottom: '20px' }}>
                                                                    <div className='blog-item'>
                                                                        <div className='blog-img'>
                                                                            <a href={`/news/${item.id}`}>
                                                                                <img src={item.banner}></img>
                                                                            </a>
                                                                        </div>

                                                                        <div className='blog-content'>
                                                                            <h3>
                                                                                <a href={`/news/${item.id}`}>
                                                                                    {item.header}
                                                                                </a>
                                                                            </h3>
                                                                            <span className='date'>
                                                                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                                                                    <i className="fa fa-calendar"></i>
                                                                                    <div>{this.getDate(item.updatedAt)}</div>
                                                                                </span>

                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}




                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-8 col-sm-12 col-xs-12'></div>
                            </div>
                        </div>
                    </>



                }


                <HomeFooter></HomeFooter>
            </>



        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
