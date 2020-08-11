import React, { useState } from "react";
import "./style.css";

function random(array) {
  array = array.replace(/\s+/g, " ").trim();
  console.log("array", array);
  array = array.split(" ");

  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function Inputs() {
  const [data, setData] = useState("");
  const [arrange, setArrange] = useState([]);
  const [result, setResult] = useState([]);
  const [output, setOutput] = useState("");

  function compare(finalResult) {
    var dataArray = data.split(" ");

    console.log(finalResult, dataArray);

    for (let i in finalResult) {
      if (finalResult[i] !== dataArray[i]) {
        return setOutput(false);
      }
    }

    setOutput(true);
  }

  function setval(value, index) {
    var finalResult = [...result, value];

    setResult(finalResult);
    console.log("val", finalResult, value);
    arrange.splice(index, 1);
    setArrange([...arrange]);

    if (arrange.length === 0) {
      compare(finalResult);
    }
  }

  return (
    <div className="main">
      <div className="Div">
        <h1 style={{ textAlign: "center" }}>Pick up words</h1>
      </div>

      <div className="Div" style={{ height: "100px" }}>
        <input
          className="User"
          onChange={(e) => {
            setData(e.target.value);
          }}
          placeholder="Enter Sentence"
        />

        <button
          onClick={() => {
            setResult([]);
            setArrange(random(data));
            setOutput("");
          }}
          disabled={data.length > 0 ? false : true}
        >
          Submit
        </button>
      </div>

      <div className="Div" style={{ height: "100px", alignItems: "center" }}>
        <div style={{ display: "flex" }}>
          {result.map((item, index) => {
            return (
              <div
                className="Button"
                onClick={() => {
                  setArrange([...arrange, item]);
                  setOutput("");
                  result.splice(index, 1);
                }}
                style={{ display: "inline-block" }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div className="Div">
        <div style={{ display: "flex" }}>
          {arrange.map((item, index) => {
            return (
              <div
                className="Button"
                onClick={() => {
                  setval(item, index);
                }}
                style={{ display: "inline-block" }}
              >
                {item}
              </div>
            );
          })}

          {output === false ? (
            <div className="Error">
              <h1>This is not Correct</h1>
            </div>
          ) : null}
          {output === true ? (
            <div className="Correct">
              <h1>This is Correct</h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Inputs;
