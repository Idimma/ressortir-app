import React, {Component} from 'react';
import Layout from "../components/Layout";
import {isMobile} from 'react-device-detect';
import {Formik} from "formik";
import * as Yup from "yup";
import {AppService} from "../services";
import * as SweetAlert from "sweetalert2";
import {catchError} from "../utils";
import {Spinner} from "reactstrap";
import {FormField} from "../components/FormElements";


class Freightw extends Component {
    render() {
        return (
            <Layout noFooter={isMobile} padded={isMobile} title="Request Freight"
                    innerClass="request-quote request-freight">
                <div className={`container  ${!isMobile && 'pt-110'} mb-5 pb-90`}>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-8 offset-lg-2">
                            <Formik
                                initialValues={{
                                    service: 'freight', phone: '', pickup_address: '', email:'',
                                    goods_size: '', name: '', goods_type: '', delivery_address: ''
                                }}
                                validationSchema={Yup.object().shape({
                                    phone: Yup.string().min(9, 'Phone number is too short').required('Phone number is required'),
                                    delivery_address: Yup.string().required('Delivery Address is required'),
                                    pickup_address: Yup.string().required('Pickup Address is required'),
                                    email: Yup.string().email().required('Email is required'),
                                    goods_type: Yup.string().required('Good Type is required'),
                                    goods_size: Yup.mixed().required('Good Size is required'),
                                    name: Yup.string().min(3, 'Name is too short').required('Name is required'),
                                })}
                                onSubmit={(values, actions) => {
                                    AppService.createOrder(values).then(() => {
                                        SweetAlert.fire('Success', 'Order Created Successfully', 'success');
                                        this.props.history.replace('/')
                                    }).catch(catchError).finally(() => {
                                        actions.setSubmitting(false);
                                    });
                                }}
                            >
                                {({handleSubmit, isSubmitting}) => (
                                    <View onSubmit={handleSubmit} className="request-quote-form">
                                        {/*<input type="hidden" name="service" value="freight"/>*/}
                                        <View className="request-title">
                                            <h1>Request Freight</h1>
                                            <p>Kindly fill out the form below.</p>
                                        </View>

                                        <div className="row mb-10">
                                            <div className="col-12">
                                                <h5 className="form__title">Personal / Company Data</h5>
                                            </div>
                                            <div className="col-12">
                                                <FormField type="text" name="name" placeholder="Full Name"/>
                                            </div>
                                            {/* /.col-lg-4 */}
                                            <div className="col-12">
                                                <FormField type="email" name="email" placeholder="Email Address"/>
                                            </div>
                                            <div className="col-12">
                                                <FormField type="tel" name="phone" placeholder="Phone Number"/>
                                            </div>
                                        </div>
                                        {/* /.row */}
                                        <div className="row mb-10">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <h5 className="form__title mb-5">Order Specification </h5>
                                                <small className="d-block mb-10">* Kindly note that the Minimum Size of
                                                    goods is between <strong>9-10 tons</strong> per truck load
                                                </small>


                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <FormField type="text" name="goods_type" placeholder="Type of Goods"/>
                                            </div>
                                            <div className="col-sm-12 col-md-6">
                                                <FormField type="text" name="goods_size" placeholder="Size of Goods"/>
                                            </div>
                                        </div>
                                        <div className="row mb-10">
                                            <div className="col-sm-12 col-md-12 col-lg-12">
                                                <h5 className="form__title">Pick up and Delivery Location</h5>
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <FormField type="text" name="pickup_address"
                                                           placeholder="Full Pick up Address"/>
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <FormField type="text" name="delivery_address"
                                                           placeholder="Full Delivery Address"/>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                                                <button type="submit" className="btn btn-round b btn__primary">
                                                    {isSubmitting ? <Spinner/> : 'Request A Quote'}
                                                </button>
                                            </div>
                                        </div>
                                    </View>)}
                            </Formik>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Freightw
