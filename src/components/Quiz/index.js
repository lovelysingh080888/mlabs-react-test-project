import React, { useState } from "react";
import { Header } from "../Partials/Header";
import { Questions } from "./Data";

export const Quiz = () => {
  const [options, setOptions] = useState([]);
  let array = [],
    array2 = [];
  const setData = (data) => {
    const newData = options.filter((item) => item.key != data.key);
    newData.push(data);
    setOptions(newData);
  };

  /// these statement will execute on submit :::::::::::::
  const submit = (e) => {
    e.preventDefault();

    options.forEach((item) => {
      array.push(item.key);
      document.getElementById(item.key).classList.remove("appendClass");
      document.getElementById("span_" + item.key).innerHTML =
        "Correct Answer is: " + item.correctAnswer;
    });
    Questions.forEach((item, index) => array2.push(index));
    let differ = array2.filter((x) => !array.includes(x));

    differ.forEach((item) => {
      document.getElementById(item).classList.add("appendClass");
    });
  };
  /// END ::::::::::::::::::::::::::::::::::::::::::::::::

  const resetState = () => {
    setOptions([]);
    array2.forEach((item) => {
      document.getElementById(item).classList.remove("appendClass");
      document.getElementById("span_" + item).innerHTML = " ";
    });
  };
  return (
    <>
      <Header />

      <div className="main-container">
        <div className="customer-page">
          <div className="main-heading">
            <h1>Quiz Test</h1>
          </div>
          <form onSubmit={submit}>
            {Questions != null &&
              Questions.map((item, index) => {
                return (
                  <>
                    <div className="card" id={index}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-1">{index + 1}.</div>
                          <div className="col-sm-11">
                            <p>
                              {item.question_title}{" "}
                              <span id={"span_" + index}></span>
                            </p>
                            <select
                              className="form-control"
                              onChange={(e) =>
                                e.target.value != "-Select an answer-"
                                  ? setData({
                                      question: item.question_title,
                                      selectedOption: e.target.value,
                                      correctAnswer: item.correctAnswer,
                                      key: index,
                                    })
                                  : ""
                              }
                            >
                              <option>-Select an answer-</option>
                              {item.options != null &&
                                item.options.map((option) => (
                                  <option>{option}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                  </>
                );
              })}

            <div className="row">
              <div className="col-sm-6">
                <button className="btn border-success form-control">
                  Submit
                </button>
              </div>
              <div className="col-sm-6">
                <button
                  type="reset"
                  className="btn  border-secondary form-control"
                  onClick={resetState}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
