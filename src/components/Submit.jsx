import styled from "styled-components/macro";
import { numberWithSpaces } from "../utils/contants";

const Submit = ({ options, isSubmited, setIsSubmited, handleSubmit }) => {
   return (
      <Wrapper>
         <div className="content_container">
            <div className="sum">
               <span className="title">Сумма договора лизинга</span>
               <span className="submit_num">
                  {isNaN(options?.total_sum)
                     ? 0
                     : numberWithSpaces(options?.total_sum)}
                  ₽
               </span>
            </div>
            <div className="monthly_payment">
               <span className="title">Ежемесячный платеж от</span>
               <span className="submit_num">
                  {isNaN(options?.monthly_payment_from)
                     ? 0
                     : numberWithSpaces(options?.monthly_payment_from)}{" "}
                  ₽
               </span>
            </div>
         </div>
         <button
            className="send_btn"
            onClick={handleSubmit}
            disabled={isSubmited}
         >
            {isSubmited ? <div className="loading"></div> : "Оставить заявку"}
         </button>
      </Wrapper>
   );
};

export default Submit;

const Wrapper = styled.div`
   margin: 20px 0;
   width: 100%;
   display: flex;
   gap: 20px;
   .content_container {
      display: flex;
      flex: 1 0 66%;

      gap: 20px;
   }
   .sum,
   .monthly_payment {
      flex: 1 0 33%;
      display: flex;
      flex-direction: column;
   }
   .send_btn {
      flex: 1 0 33%;
      background-color: #ff9514;
      border-radius: 40px;
      color: #fff;
      font-size: 26px;
      border: none;
      font-weight: 500;
      height: 68px;
      cursor: pointer;
      &:hover {
         background-color: #111;
      }
      &:active {
         background-color: #575757;
      }
      &:disabled {
         opacity: 0.4;
         cursor: not-allowed;
      }
   }
   .title {
      margin-bottom: 10px;
      color: #575757;
      font-family: "Gilroy";
   }
   .submit_num {
      font-size: 40px;
      color: #333;
      font-weight: 700;
   }

   /* .sum,
   .monthly_payment,
   .send_btn {
      flex: 1;
   }
   .sum,
   .monthly_payment {
      display: flex;
      flex-direction: column;
   }
   .submit_num {
      font-size: 40px;
      color: #333;
   }
   .send_btn {
      background-color: #ff9514;
      border-radius: 40px;
      color: #fff;
      font-size: 30px;
      border: none;
      font-weight: 500;
      height: 68px;
      cursor: pointer;
      &:hover {
         background-color: #111;
      }
      &:active {
         background-color: #575757;
      }
      &:disabled {
         opacity: 0.4;
         cursor: not-allowed;
      }
   } */
   @media screen and (max-width: 1119px) {
      flex-wrap: wrap;
      max-width: 100%;

      .content_container {
         gap: 20px;
         justify-content: flex-start;
         flex: 1 0 100%;
      }

      .sum,
      .monthly_payment {
         flex: 0 1 33%;
      }
      .send_btn {
         flex: 0 1 33%;
         margin-top: 20px;
      }
   }
   @media screen and (max-width: 767px) {
      .content_container {
         flex-direction: column;
      }
      .sum,
      .monthly_payment {
         width: 100%;
      }
      .send_btn {
         width: 100%;
         flex-grow: 0;
         flex-basis: auto;
         margin-top: 20px;
         font-size: 20px;
      }
      .submit_num {
         font-size: 25px;
      }
   }
`;
