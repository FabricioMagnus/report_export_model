import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const ProgressoPorEtapas = ({ etapaAtual, totalEtapas }) => {
  const progresso = (etapaAtual / totalEtapas) * 100;

  return (
    <div style={{ width: "100px" }}>
      <CircularProgressbar
        value={progresso}
        text={`${etapaAtual}/${totalEtapas}`}
        styles={buildStyles({
          textSize: "16px",
          pathTransitionDuration: 0.5,
          pathColor: `rgba(62, 152, 199, ${progresso / 100})`,
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};
