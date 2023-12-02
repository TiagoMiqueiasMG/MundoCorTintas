// Question.js
import React from "react";

const Question = ({ index, accordion, toggleAccordion, questao, resposta }) => {
  return (
    <div key={index}>
      <div className="accordion__faq-heading" onClick={() => toggleAccordion(index)}>
        <h3>{questao}</h3>
        <span className="verticle">{accordion === index ? "-" : "+"}</span>
      </div>
      {accordion === index && (
        <div>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
