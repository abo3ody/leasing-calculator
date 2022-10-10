import { useEffect, useState } from "react";

import styled from "styled-components/macro";

import {
   calculateInitailFee,
   calculateMonthPay,
   calculateTotalAmount,
   numberWithSpaces,
   validateInput,
} from "../utils/contants";

import { carPrice, initailFee, leasingTerm } from "../utils/values";

const CalcForm = ({ options, setOptions, isSubmited }) => {
   const [selected, setSelected] = useState(false);
   const {
      car_coast = 3300000,
      initail_payment = 0,
      initail_payment_percent = 13,
      lease_term = 60,
      monthly_payment_from = 0,
   } = options;

   const handleChange = (e) => {
      const { name, value } = e.target;
      setOptions({ ...options, [name]: value.replace(/\D/g, "") });
   };

   useEffect(() => {
      setOptions((prevOptions) => ({
         ...prevOptions,
         initail_payment: calculateInitailFee(
            prevOptions.initail_payment_percent,
            prevOptions.car_coast
         ),
      }));
      // eslint-disable-next-line
   }, [initail_payment_percent, car_coast]);

   useEffect(() => {
      setOptions((prevOptions) => ({
         ...prevOptions,
         monthly_payment_from: calculateMonthPay(
            prevOptions.car_coast,
            prevOptions.initail_payment,
            prevOptions.lease_term
         ),
      }));
      // eslint-disable-next-line
   }, [car_coast, initail_payment, lease_term]);

   useEffect(() => {
      setOptions((prevOptions) => ({
         ...prevOptions,
         total_sum: calculateTotalAmount(
            prevOptions.initail_payment,
            prevOptions.lease_term,
            prevOptions.monthly_payment_from
         ),
      }));
      // eslint-disable-next-line
   }, [initail_payment, lease_term, monthly_payment_from]);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setOptions((prevOptions) => ({
            ...prevOptions,
            car_coast: validateInput(
               prevOptions.car_coast,
               carPrice.min,
               carPrice.max
            ),
         }));
      }, 3000);
      return () => clearTimeout(timeout);
      // eslint-disable-next-line
   }, [car_coast]);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setOptions((prevOptions) => ({
            ...prevOptions,
            initail_payment_percent: validateInput(
               prevOptions.initail_payment_percent,
               initailFee.min,
               initailFee.max
            ),
         }));
      }, 3000);
      return () => clearTimeout(timeout);
      // eslint-disable-next-line
   }, [initail_payment_percent]);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setOptions((prevOptions) => ({
            ...prevOptions,
            lease_term: validateInput(
               prevOptions.lease_term,
               leasingTerm.min,
               leasingTerm.max
            ),
         }));
      }, 3000);
      return () => clearTimeout(timeout);
      // eslint-disable-next-line
   }, [lease_term]);

   return (
      <Wrapper>
         <div className="input">
            <label htmlFor="" className="title">
               Стоимость автомобиля
            </label>
            <div
               className="input_container"
               style={{ opacity: isSubmited ? 0.4 : 1 }}
            >
               <input
                  type="text"
                  className="text_input"
                  value={numberWithSpaces(car_coast)}
                  onChange={handleChange}
                  name="car_coast"
                  disabled={isSubmited}
               />
               <div className="slider_container">
                  <span className="bar">
                     <span
                        className="fill"
                        style={{
                           width: `${
                              ((car_coast - carPrice.min) /
                                 (carPrice.max - carPrice.min)) *
                              100
                           }%`,
                        }}
                     ></span>
                  </span>
                  <input
                     type="range"
                     min={carPrice.min}
                     max={carPrice.max}
                     value={car_coast}
                     onChange={handleChange}
                     className="range"
                     name="car_coast"
                     disabled={isSubmited}
                  />
               </div>
               <span className="type_icon">₽</span>
            </div>
         </div>
         <div className="input">
            <label htmlFor="" className="title">
               Первоначальный взнос
            </label>
            <div
               className="input_container"
               style={{
                  opacity: isSubmited ? 0.4 : 1,
                  cursor: isSubmited ? "not-allowed" : "default",
               }}
            >
               <p className="text_input initail_fee">
                  {numberWithSpaces(initail_payment)} ₽
               </p>
               <div className="slider_container">
                  <span className="bar">
                     <span
                        className="fill"
                        style={{
                           width: `${
                              ((initail_payment_percent - initailFee.min) /
                                 (initailFee.max - initailFee.min)) *
                              100
                           }%`,
                        }}
                     ></span>
                  </span>
                  <input
                     type="range"
                     min={initailFee.min}
                     max={initailFee.max}
                     value={initail_payment_percent}
                     onChange={handleChange}
                     className="range"
                     name="initail_payment_percent"
                     disabled={isSubmited}
                  />
               </div>
               <span
                  className={`${selected ? "percent selected" : "percent "}`}
                  onFocus={() => setSelected(true)}
               >
                  <input
                     className="percent_text"
                     value={`${initail_payment_percent}`}
                     onChange={handleChange}
                     name="initail_payment_percent"
                     onFocus={() => setSelected(true)}
                     onBlur={() => setSelected(false)}
                     disabled={isSubmited}
                  />
                  <span className="percent_icon">%</span>
               </span>
            </div>
         </div>
         <div className="input">
            <label htmlFor="" className="title">
               Срок лизинга
            </label>
            <div
               className="input_container"
               style={{ opacity: isSubmited ? 0.4 : 1 }}
            >
               <input
                  type="text"
                  className="text_input"
                  value={numberWithSpaces(lease_term)}
                  onChange={handleChange}
                  name="lease_term"
                  disabled={isSubmited}
               />
               <div className="slider_container">
                  <span className="bar">
                     <span
                        className="fill"
                        style={{
                           width: `${
                              ((lease_term - leasingTerm.min) /
                                 (leasingTerm.max - leasingTerm.min)) *
                              100
                           }%`,
                        }}
                     ></span>
                  </span>
                  <input
                     type="range"
                     min={leasingTerm.min}
                     max={leasingTerm.max}
                     value={lease_term}
                     onChange={handleChange}
                     className="range"
                     name="lease_term"
                     disabled={isSubmited}
                  />
               </div>
               <span className="type_icon">мес.</span>
            </div>
         </div>
      </Wrapper>
   );
};

export default CalcForm;

const Wrapper = styled.form`
   margin: 20px 0;
   width: 100%;
   display: flex;
   gap: 20px;

   .input_container {
      position: relative;
      width: 100%;
   }
   .title {
      color: #575757;
      font-family: "Gilroy";
      margin-bottom: 20px;
   }
   .input {
      display: flex;
      flex-direction: column;
      flex: 1;
   }

   .text_input {
      width: 100%;
      height: 68px;
      padding: 10px;
      background-color: #f3f3f4;
      border: 1px solid #f3f3f4;
      border-radius: 16px;
      font-size: 22px;
      color: #575757;
      font-weight: 700;
      outline: none;
      &:focus {
         background-color: #fff;
      }
   }
   .initail_fee {
      display: flex;
      align-items: center;
   }
   .range {
      width: 100%;
      height: 1px;
      -webkit-appearance: none;
      background: black;
      outline: none;
      z-index: 2;
      background-color: transparent;
      position: relative;
   }

   .range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ff9514;
      cursor: pointer;

      box-shadow: 0 0 0 0 #ff9514;
      outline: none;
      transition: 0.3s ease-in-out;
   }
   .slider_container {
      position: relative;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      z-index: 1;
   }
   .bar {
      position: absolute;
      z-index: 1;
      left: 0;
      top: 13px;
      width: 100%;
      height: 2px;
      background-color: #e1e1e1;
      overflow: hidden;
   }
   .fill {
      display: block;
      width: 0;
      height: 100%;
      background-color: #ff9514;
   }
   .type_icon {
      position: absolute;
      right: 20px;
      top: 15%;
      font-size: 25px;
      color: #575757;
      font-weight: 700;
   }
   .percent {
      position: absolute;
      right: 10px;
      top: 10%;
      width: 70px;
      height: 50px;
      background-color: #ebebec;
      border: 1px solid #ebebec;
      border-radius: 16px;
      color: #575757;
      /* font-weight: 500; */
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
   }
   .selected {
      background-color: #fff;
   }
   .percent_icon {
      font-weight: 900;
      /* font-weight: 500; */
   }

   .percent_text {
      width: 22px;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      color: #575757;
      font-size: 18px;
      font-weight: 700;
   }

   @media screen and (max-width: 1119px) {
      flex-direction: column;
   }
   @media screen and (max-width: 767px) {
      .title {
         font-size: 14px;
         margin-bottom: 10px;
      }
      .text_input {
         height: 60px;

         font-size: 18px;
      }
      .type_icon {
         top: 20%;
         font-size: 20px;
      }
      .percent {
         top: 9%;
         width: 60px;
         height: 45px;
         font-size: 16px;
      }
      .percent_text {
         font-size: 16px;
      }
   }
`;
