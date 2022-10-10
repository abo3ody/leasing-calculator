import axios from "axios";
import { useState } from "react";
import styled from "styled-components/macro";
import CalcForm from "./components/CalcForm";
import Submit from "./components/Submit";

function App() {
   const [isSubmited, setIsSubmited] = useState(false);

   const [options, setOptions] = useState({
      car_coast: 3300000,
      initail_payment: 0,
      initail_payment_percent: 13,
      lease_term: 60,
      total_sum: 0,
      monthly_payment_from: 0,
   });

   const sendRedquest = async (options) => {
      const request = JSON.stringify(options);
      setIsSubmited(true);
      try {
         const { data } = await axios.post(
            "https://hookb.in/eK160jgYJ6UlaRPldJ1P",
            request
         );

         setIsSubmited(false);
         console.log(data);
      } catch (error) {
         setIsSubmited(false);
         console.log(error);
      }
   };

   const handleSubmit = () => {
      sendRedquest(options);
   };
   return (
      <Wrapper className="App">
         <h1 className="header">Рассчитайте стоимость автомобиля в лизинг</h1>
         <CalcForm
            options={options}
            setOptions={setOptions}
            isSubmited={isSubmited}
         />
         <Submit
            options={options}
            isSubmited={isSubmited}
            setIsSubmited={setIsSubmited}
            handleSubmit={handleSubmit}
         />
      </Wrapper>
   );
}

export default App;

const Wrapper = styled.div`
   width: 90%;
   height: 100vh;
   margin: auto;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
   .header {
      width: 60%;
      line-height: 35px;
      font-size: 45px;
      font-weight: 900;
      color: #111111;
   }

   @media screen and (max-width: 1119px) {
      height: 100%;
      padding: 50px 0;
   }
   @media screen and (max-width: 767px) {
      .header {
         font-size: 35px;
      }
   }
`;
