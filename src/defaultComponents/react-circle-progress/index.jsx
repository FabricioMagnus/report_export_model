import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProgressoPorEtapas = ({ etapaAtual, totalEtapas }) => {
  const progresso = (etapaAtual / totalEtapas) * 100;

  return (
    <div style={{ width: "100px" }}>
      <CircularProgressbar
        value={progresso}
        text={`${progresso} %`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          textSize: "16px",
          backgroundColor: "#3e98c7",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent",
        })}
      />
    </div>
  );
};
