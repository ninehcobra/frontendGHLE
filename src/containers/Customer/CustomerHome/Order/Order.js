import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './Order.scss'
import notFoundImg from '../../../../assets/notfound.svg'
import CustomScrollbars from '../../../../components/CustomScrollbars';
import moment from 'moment';
import jsPDF from "jspdf"
import RobotoRegular from '../../../../assets/fonts/Bruno_Ace_SC,Roboto/Roboto/Roboto-Regular.ttf'
import { getAllCodeService } from '../../../../services/userService';

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            startDate: new Date(new Date().getTime()).setMonth(new Date(new Date().getTime()).getMonth() - 1),
            endDate: new Date(),
            isPrint: false,
            statusArr: []
        }
    }

    async componentDidMount() {
        let res = await getAllCodeService('STATUS')
        this.setState({
            statusArr: res.data
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.arr !== this.props.arr) {
            this.setState({
                arr: this.props.arr
            })
        }
        if (prevProps.startDate !== this.props.startDate) {
            this.setState({
                startDate: this.props.startDate
            })
        }
        if (prevProps.endDate !== this.props.endDate) {
            this.setState({
                endDate: this.props.endDate
            })
        }
    }

    printPDF = (data) => {

        const doc = new jsPDF();
        doc.addFileToVFS('Roboto-Regular.ttf', RobotoRegular)
        doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');


        const content = `
        Tên Người gửi: ${data.takeName}
        Địa chỉ Người gửi: ${data.takeAddress}
        Số điện thoại Người gửi: ${data.takePhone}
        Thời gian gửi: ${data.takeTime}
        Tên Người nhận: ${data.receiverName}
        Địa chỉ Người nhận: ${data.receiverAddress}
        Số điện thoại Người nhận: ${data.takePhone}
        Các sản phẩm: ${data.arrProduct}
        Tổng trọng lượng: ${data.totalWeight}
        Tiền thu hộ: ${data.CODCost}
        Phí vận chuyển: ${data.fee}
        Bên trả tiền phí: ${data.payOption}
      `;

        // Thêm nội dung vào PDF
        doc.text(content, 10, 10);


        doc.save("a4.pdf");
    }

    getStatus = (e) => {
        let status = ''
        this.state.statusArr.map((item, index) => {
            if (item.key === e) {
                status = item.valueVi
            }
        })
        return status
    }


    render() {
        const { arr, startDate, endDate } = this.state
        const { processLogout, language, userInfo } = this.props;
        return (

            <div class="order-container" >
                <div className='line'></div>
                {
                    arr.length !== 0 ?
                        <>
                            <div className='order-header-box row'>
                                <div className='col-md-1 order-header'>STT</div>
                                <div className='col-md-2 order-header' >Mã đơn</div>
                                <div className='col-md-3 order-header'>Bên nhận</div>
                                <div className='col-md-1 order-header' >Tổng phí dịch vụ</div>
                                <div className='col-md-1 order-header' >Thụ hộ/COD (nếu có)</div>
                                <div className='col-md-4 order-header' >Tùy chọn thanh toán</div>
                            </div>
                            <div className='line'></div>
                        </>
                        : ''
                }


                <div style={{ overflowY: 'auto', height: '75vh' }}>

                    {arr.length !== 0 ? arr.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='order-info-box row'>
                                    <div className='col-md-1 order-info blue-color'>{index + 1}</div>
                                    <div className='col-md-2 order-info' >
                                        <div className='blue-color' style={{ fontSize: '16px' }}>{item.Orders.id}</div>
                                        <div className=' orange-color' style={{ fontSize: '13px' }}>{this.getStatus(item.Orders.status)}</div>
                                    </div>
                                    <div className='col-md-3 order-info'>
                                        <div className='blue-color' style={{ fontSize: '14px' }}>{item.Orders.receiverName}</div>
                                        <div className=' orange-color black-color' style={{ fontSize: '12px' }}>{item.Orders.receiverAddress}</div>
                                    </div>
                                    <div className='col-md-1 order-info blue-color' style={{ fontSize: '15px' }} >{item.Orders.fee + " vnđ"}</div>
                                    <div className='col-md-1 order-info blue-color' style={{ fontSize: '15px' }}>{item.Orders.totalCost + " vnđ"}</div>
                                    <div className='col-md-4 order-info' style={{ flexDirection: 'row' }} >
                                        <div style={{ height: '100%', width: '30%' }}>
                                            <div className='orange-color'>{item.Orders.payOption === 'P1' ? 'Bên gửi trả phí' : 'Bên nhận trả phí'}</div>
                                            <div className=' blue-color'>{'Tổng phí: ' + item.Orders.fee + ' vnđ'}</div>
                                        </div>
                                        <div style={{ height: '100%', width: '70%', flexDirection: 'column !important' }}>
                                            <div className='order-info-btn-box' style={{ height: '50%', width: '50%' }}>

                                                <button className='disabled'>Chỉnh sửa</button>
                                                <button className='info-btn'>Trợ giúp</button>
                                            </div>
                                            <div className='order-info-btn-box' style={{ height: '50%', width: '50%' }}>
                                                <a href={`/orders/` + item.Orders.id} className='info-btn'>Tra cứu</a>
                                                <button onClick={() => this.printPDF(item.Orders)} className='info-btn'>In vận đơn</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='line'></div>
                            </div>)

                    }) :
                        <div className='notfound-container' >
                            <img className='image' src={notFoundImg}></img>
                            <div className='notfound-text'>{'Không có đơn hàng hiển thị trong khoảng thời gian từ '}
                                <span className='date'> {moment(this.state.startDate).format('DD/MM/YYYY')} - {moment(this.state.endDate).format('DD/MM/YYYY')}</span>
                            </div>
                        </div>
                    }

                </div>






            </div >


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

export default connect(mapStateToProps, mapDispatchToProps)(Order);
